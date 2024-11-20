const db = require("../models");
const fs = require('fs');
const Pergunta = db.perguntas;
const Arquivo = db.arquivos;
const { v4: uuidv4 } = require('uuid'); // Importar a função de geração de GUID
const Usuario = db.usuarios;

// Cria e salva uma nova pergunta
exports.create = async (req, res) => {
  try {
    // Extrair dados da requisição
    const { 
      disciplina,  // Agora disciplina deve conter { sigla: "IAC001", nomeCompleto: "Arquitetura e Organização de Computadores", cor: "#FF5733" }
      tipo, 
      E, 
      Q_T, 
      Q, 
      T, 
      I, 
      A, 
      C_A, 
      A2, 
      descricao, 
      A3, 
      A3_Why, 
      A4, 
      A4_Why, 
      A5, 
      A5_Why, 
      C_S, 
      S, 
      R_T, 
      R_I, 
      R_A, 
      P_T, 
      P_I,
      P_A, 
      O_L, 
      usuario, 
      arquivos 
    } = req.body;

    // Verificar se a disciplina foi enviada corretamente
    if (!disciplina || !disciplina.sigla || !disciplina.nomeCompleto) {
      return res.status(400).json({ mensagem: "Disciplina inválida. Certifique-se de enviar a sigla e o nome completo." });
    }

    // Verificar se a cor está presente e se é válida
    if (disciplina.cor && !/^#([0-9A-F]{3}){1,2}$/i.test(disciplina.cor)) {
      return res.status(400).json({ mensagem: "A cor da disciplina é inválida. Use um código hexadecimal válido." });
    }

    // Multiplicar o valor de T por 60
    const emTicks = T * 60;

    // Gerar o GUID da pergunta com prefixo 'MZQ_'
    const GUID = 'MZQ_' + uuidv4();

    // Verificar se já existe uma pergunta com o mesmo GUID
    const perguntaExistente = await Pergunta.findOne({ GUID });

    if (perguntaExistente) {
      return res.status(400).json({ mensagem: "O GUID já está em uso. Por favor, tente novamente." });
    }

    // Criar nova pergunta com os dados recebidos
    const novaPergunta = new Pergunta({
      disciplina,  // Agora será um objeto com sigla, nomeCompleto e cor (se fornecida)
      tipo,
      GUID, // Incluir o GUID gerado
      E,
      Q_T,
      Q,
      T: emTicks, // Atualizar T para o valor multiplicado
      I,
      A,
      C_A,
      A2,
      descricao,
      A3,
      A3_Why,
      A4,
      A4_Why,
      A5,
      A5_Why,
      C_S,
      S,
      R_T,
      R_I,
      R_A,
      P_T,
      P_I,
      P_A,
      O_L,
      usuario,
      arquivos // Associar os IDs dos arquivos à pergunta
    });

    // Salvar a pergunta
    const perguntaSalva = await novaPergunta.save();

    // Atualizar o array de perguntas do usuário correspondente
    await Usuario.findByIdAndUpdate(
      usuario,
      { $push: { perguntas: perguntaSalva._id } },
      { new: true }
    );

    res.status(201).json(perguntaSalva);
  } catch (error) {
    console.error("Erro ao criar a pergunta:", error);
    res.status(500).json({ mensagem: "Erro ao criar a pergunta. Por favor, tente novamente mais tarde." });
  }
};


exports.findAll = async (req, res) => {
  const descricaoFiltro = req.query.descricao  
  const userId = req.query.userId
  const isAdmin = req.query.isAdmin === 'true'  // Converter isAdmin para booleano

  if (isAdmin || !userId) {
    Pergunta.find().then(data => res.send(data))
      .catch(err => {
        console.error("Erro ao buscar as perguntas:", err)
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao buscar as perguntas."
        })
      })
    return
  }

  let disciplinas = []
  try {
    const usuario = await Usuario.findById(userId)

    disciplinas = usuario?.disciplinas?.map(disciplina => disciplina?.sigla) || []
  } catch (err) {
    console.log(err)
  }

  if (disciplinas.length === 0) {
    return res.status(400).send({message: 'Nenhuma disciplina encontrada para o usuário.'})
  }
  const condition = descricaoFiltro
    ? { "descricao": { $regex: new RegExp(descricaoFiltro, "i") }, "disciplina.sigla": { $in: disciplinas } }
    : { "disciplina.sigla": { $in: disciplinas } }

  Pergunta.find(condition)
    .then(data => res.send(data))
    .catch(err => {
      console.error("Erro ao buscar as perguntas:", err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao buscar as perguntas."
      })
    })
}


// Encontra uma pergunta pelo ID
exports.findById = (req, res) => {
  const id = req.params.id;

  Pergunta.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Pergunta com o ID " + id + " não encontrada." });
      else res.send(data);
    })
    .catch(err => {
      console.error("Erro ao buscar pergunta com o ID " + id, err);
      res.status(500).send({ message: "Erro ao buscar pergunta com o ID " + id });
    });
};

// Atualiza uma pergunta existente pelo ID
exports.update = async (req, res) => {
  try {
    const perguntaId = req.params.id;
    const novoValorDeTempo = req.body.T;

    // Buscar a pergunta atual no banco de dados
    const perguntaAtual = await Pergunta.findById(perguntaId);

    if (!perguntaAtual) {
      return res.status(404).send({ message: "Pergunta não encontrada!" });
    }

    // Verificar se um novo valor de tempo foi gravado
    if (novoValorDeTempo !== undefined && novoValorDeTempo !== perguntaAtual.T) {
      // Multiplicar o novo valor de T por 60
      req.body.T *= 60;
    }

    // Atualizar a pergunta no banco de dados
    const updatedPergunta = await Pergunta.findByIdAndUpdate(perguntaId, req.body, { new: true });

    if (!updatedPergunta) {
      return res.status(404).send({ message: "Pergunta não encontrada!" });
    }

    res.send(updatedPergunta);
  } catch (err) {
    console.error("Erro ao atualizar a pergunta:", err);
    res.status(500).send({ message: "Erro ao atualizar a pergunta." });
  }
};

// Exclui uma pergunta pelo ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const pergunta = await Pergunta.findById(id);

    if (!pergunta) {
      return res.status(404).send({
        message: `Não foi possível excluir a pergunta com o ID=${id}. Pergunta não encontrada!`
      });
    }

    // Exclui os arquivos associados à pergunta
    for (const arquivoId of pergunta.arquivos) {
      const arquivo = await Arquivo.findById(arquivoId);
      if (arquivo) {
        // Remove o arquivo do sistema de arquivos
        const filePath = arquivo.nome;
        const directory = filePath.includes('.png') ? 'jogo/img/pictures/' : 'jogo/audio/se/';
        const fullPath = `../${directory}${filePath}`;

        // Verifica se o arquivo existe antes de tentar excluí-lo
        if (fs.existsSync(fullPath)) {
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error("Erro ao excluir o arquivo do sistema de arquivos:", err);
            }
          });
        } else {
          console.log("Arquivo não encontrado no sistema de arquivos:", fullPath);
        }
      }
      // Exclui o arquivo do banco de dados
      await Arquivo.findByIdAndRemove(arquivoId);
    }

    // Remove a pergunta do array de perguntas do usuário
    await Usuario.findByIdAndUpdate(pergunta.usuario, { $pull: { perguntas: id } });

    // Exclui a pergunta do banco de dados
    await Pergunta.findByIdAndRemove(id);

    res.send({ message: "Pergunta e arquivos associados foram excluídos com sucesso!" });
  } catch (err) {
    console.error("Erro ao excluir a pergunta:", err);
    res.status(500).send({
      message: "Não foi possível excluir a pergunta com ID=" + id
    });
  }
};

// Obtém todos os arquivos associados a uma pergunta
exports.getArquivosDaPergunta = (req, res) => {
  const id = req.params.id;

  Pergunta.findById(id)
    .populate("arquivos")
    .exec((err, pergunta) => {
      if (err) {
        console.error("Erro ao buscar arquivos da pergunta com ID=" + id, err);
        res.status(500).send({ message: "Erro ao buscar arquivos da pergunta com ID=" + id });
        return;
      }

      if (!pergunta) {
        return res.status(404).send({ message: "Pergunta com ID=" + id + " não encontrada." });
      }

      res.send(pergunta.arquivos);
    });
};
