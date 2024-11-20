const sharp = require('sharp'); // Importar a biblioteca sharp
const db = require("../models");
const Arquivo = db.arquivos;
const Pergunta = db.perguntas;
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Função para extrair o tipo de arquivo do prefixo Base64 e determinar a extensão
const getFileTypeFromBase64 = (base64String) => {
  const match = base64String.match(/^data:(image\/\w+|audio\/\w+);base64,/);
  if (match) {
    const mimeType = match[1];
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'audio/ogg':
        return 'ogg';
      case 'audio/mp3':
        return 'mp3';
      // Adicione mais casos conforme necessário
      default:
        return 'bin'; // Extensão padrão para tipos não mapeados
    }
  }
  return 'bin'; // Extensão padrão se o tipo MIME não for encontrado
};



// Função para redimensionar a imagem mantendo a proporção e adicionando fundo preto
const resizeImage = async (base64Image, width, height) => {
  try {
    // Remove o prefixo do base64
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Detecta o formato da imagem
    const { info } = await sharp(buffer).metadata();
    const format = info && info.format ? info.format : 'png'; // Valor padrão 'png' se não for possível detectar o formato

    // Define o tipo MIME correspondente
    const mimeType = {
      jpeg: 'jpeg',
      png: 'png',
      webp: 'webp',
      tiff: 'tiff',
      gif: 'gif'
    }[format] || 'png'; // Usa 'png' como padrão se o formato não for encontrado

    // Redimensiona a imagem mantendo a proporção e adicionando fundo preto
    const resizedBuffer = await sharp(buffer)
      .resize(width, height, {
        fit: 'contain', // Mantém a proporção da imagem
        background: { r: 0, g: 0, b: 0 } // Fundo preto
      })
      .toFormat(mimeType) // Mantém o formato original
      .toBuffer();

    // Converte o buffer redimensionado para base64
    const resizedBase64 = `data:image/${mimeType};base64,${resizedBuffer.toString('base64')}`;
    return resizedBase64;
  } catch (error) {
    console.error('Erro ao redimensionar a imagem:', error);
    throw new Error('Erro ao redimensionar a imagem.');
  }
};

// Cria um novo arquivo
exports.create = async (req, res) => {
  //console.log("Corpo da solicitação (req.body):", req.body);
  //console.log("ID da pergunta recebido:", req.body.pergunta);

  try {
    // Verifica se o arquivo foi enviado
    if (!req.body.base64 || !req.body.nome) {
      return res.status(400).send({ message: "Nenhum arquivo enviado!" });
    }

    // Verifica se a pergunta existe mesmo
    let pergunta;
    if (req.body.pergunta) {
      pergunta = await Pergunta.findById(req.body.pergunta);
      if (!pergunta) {
        return res.status(404).send({ message: "Pergunta não encontrada!" });
      }
    } else {
      const novaPergunta = new Pergunta();
      await novaPergunta.save();
      pergunta = novaPergunta;
    }

    // Redimensiona a imagem se o tipo for imagem
    let base64Image = req.body.base64;
    const fileType = getFileTypeFromBase64(req.body.base64);
    if (fileType === 'png' || fileType === 'jpg') {
      base64Image = await resizeImage(req.body.base64, 816 , 624 );
    }

    // Gera o novo nome do arquivo com o GUID da pergunta, se disponível
    let novoNome;
    if (pergunta && pergunta.GUID) {
      const extension = getFileTypeFromBase64(base64Image);
      novoNome = `${pergunta.GUID}.${extension}`;
    } else {
      novoNome = req.body.nome.toLowerCase(); // Mantém o nome original do arquivo em minúsculas
    }

    // Cria uma instância do modelo Arquivo com o novo nome e conteúdo Base64
    const arquivo = new Arquivo({
      nome: novoNome,
      base64: base64Image,
      pergunta: pergunta ? pergunta._id : null
    });

    // Salvar o arquivo
    const arquivoSalvo = await arquivo.save();

    // Adicione o ID do arquivo à lista de arquivos da pergunta
    if (pergunta) {
      pergunta.arquivos.push(arquivoSalvo._id);
      await pergunta.save();

      // Se o arquivo foi nomeado com o nome original, exclua a pergunta relacionada
      if (req.body.nome === novoNome && pergunta) {
        await pergunta.deleteOne();
      }
    }

    // Responda com o arquivo salvo
    res.status(201).json(arquivoSalvo);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar o arquivo." });
  }
};

// Recupera todos os Arquivos do banco de dados
exports.findAll = async (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};

  try {
    const arquivos = await Arquivo.find(condition);
    res.send(arquivos);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Ocorreu um erro ao recuperar os arquivos." });
  }
};

// Encontra um único Arquivo pelo id
exports.findById = async (req, res) => {
  const id = req.params.id;

  try {
    const arquivo = await Arquivo.findById(id);
    if (!arquivo) {
      res.status(404).send({ message: "Arquivo não encontrado com o id " + id });
    } else {
      res.send(arquivo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao recuperar o arquivo com o id=" + id });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Encontra o arquivo existente pelo ID
    const arquivoExistente = await Arquivo.findById(id);
    if (!arquivoExistente) {
      return res.status(404).send({ message: "Arquivo não encontrado!" });
    }

    // Se um novo conteúdo base64 for fornecido, redimensiona a imagem se for uma imagem
    if (updateData.base64) {
      const fileType = getFileTypeFromBase64(updateData.base64);
      if (fileType === 'jpg' || fileType === 'png') {
        updateData.base64 = await resizeImage(updateData.base64, 920, 700);
      }
    }

    // Mantém o nome original do arquivo existente
    updateData.nome = arquivoExistente.nome.toLowerCase();

    // Atualiza o arquivo com os novos dados
    const arquivoAtualizado = await Arquivo.findByIdAndUpdate(id, updateData, { new: true });
    if (!arquivoAtualizado) {
      return res.status(404).send({ message: "Arquivo não encontrado!" });
    }

    // Verifica se o nome foi realmente mantido
    //console.log("Arquivo atualizado:", arquivoAtualizado);

    res.send(arquivoAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao atualizar o arquivo." });
  }
};


// Exclui um Arquivo com o id especificado na requisição
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const arquivo = await Arquivo.findByIdAndRemove(id);
    if (!arquivo) {
      return res.status(404).send({
        message: `Não é possível excluir o arquivo com o id=${id}. Talvez o arquivo não tenha sido encontrado!`
      });
    }

    // Remove o ID do arquivo do array 'arquivos' da pergunta
    await Pergunta.findByIdAndUpdate(
      arquivo.pergunta,
      { $pull: { arquivos: id } },
      { new: true } // Retorna a pergunta atualizada após a remoção do arquivo
    );

    res.send({ message: "Arquivo excluído com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Não foi possível excluir o arquivo com id=" + id });
  }

};