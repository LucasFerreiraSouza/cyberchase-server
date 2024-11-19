const db = require("../models");
const fs = require('fs');
const Usuario = db.usuarios;
const Pergunta = db.perguntas;
const Arquivo = db.arquivos;
const sgMail = require('@sendgrid/mail');

// Função para validar e-mail
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Create and Save a new Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome || !req.body.email) {
    return res.status(400).send({ message: "O campo nome e e-mail são obrigatórios!" });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({ message: "O e-mail fornecido não é válido!" });
  }

  // Validação das disciplinas
  if (req.body.disciplinas) {
    if (!Array.isArray(req.body.disciplinas)) {
      return res.status(400).send({ message: "Disciplinas deve ser um array." });
    }
    
    for (const disciplina of req.body.disciplinas) {
      if (!disciplina.sigla || !disciplina.nomeCompleto) {
        return res.status(400).send({ message: "Cada disciplina deve conter sigla e nome completo." });
      }

      // Verificar se a cor da disciplina é válida, se estiver presente
      if (disciplina.cor && !/^#([0-9A-F]{3}){1,2}$/i.test(disciplina.cor)) {
        return res.status(400).send({ message: "A cor da disciplina é inválida. Use um código hexadecimal válido." });
      }
    }
  }

  // Check if a user with the same name already exists
  Usuario.findOne({ nome: req.body.nome })
    .then(existingUserByName => {
      if (existingUserByName) {
        return res.status(400).send({ message: "Já existe um usuário com o mesmo nome!" });
      }

      // Check if a user with the same email already exists
      Usuario.findOne({ email: req.body.email })
        .then(existingUserByEmail => {
          if (existingUserByEmail) {
            return res.status(400).send({ message: "Já existe um usuário com o mesmo e-mail!" });
          }

          // Create a Usuario
          const usuario = new Usuario({
            nome: req.body.nome,
            disciplinas: req.body.disciplinas || [], // garante que disciplinas sejam um array, mesmo que vazio
            email: req.body.email,
            senha: req.body.senha,
            isAdmin: req.body.isAdmin,
            isTeacher: req.body.isTeacher,
          });

          // Save Usuario in the database
          usuario.save()
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Ocorreu um erro ao criar o Usuario."
              });
            });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocorreu um erro ao verificar a existência de usuários com o mesmo e-mail."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao verificar a existência de usuários com o mesmo nome."
      });
    });
};

// Update a Usuario by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Os dados para atualização não podem estar vazios!"
    });
  }

  if (req.body.email && !isValidEmail(req.body.email)) {
    return res.status(400).send({ message: "O e-mail fornecido não é válido!" });
  }

  // Validação das disciplinas
  if (req.body.disciplinas) {
    if (!Array.isArray(req.body.disciplinas)) {
      return res.status(400).send({ message: "Disciplinas deve ser um array." });
    }

    for (const disciplina of req.body.disciplinas) {
      if (!disciplina.sigla || !disciplina.nomeCompleto) {
        return res.status(400).send({ message: "Cada disciplina deve conter sigla e nome completo." });
      }

      // Verificar se a cor da disciplina é válida, se estiver presente
      if (disciplina.cor && !/^#([0-9A-F]{3}){1,2}$/i.test(disciplina.cor)) {
        return res.status(400).send({ message: "A cor da disciplina é inválida. Use um código hexadecimal válido." });
      }
    }
  }

  const id = req.params.id;

  try {
    // Verifica se já existe um usuário com o mesmo nome
    const existingUserByName = await Usuario.findOne({ nome: req.body.nome, _id: { $ne: id } });
    if (existingUserByName) {
      return res.status(400).send({ message: "Já existe um usuário com o mesmo nome!" });
    }

    // Verifica se já existe um usuário com o mesmo e-mail
    const existingUserByEmail = await Usuario.findOne({ email: req.body.email, _id: { $ne: id } });
    if (existingUserByEmail) {
      return res.status(400).send({ message: "Já existe um usuário com o mesmo e-mail!" });
    }

    const updateData = {
      ...req.body,
      disciplinas: req.body.disciplinas || [], // garante que disciplinas sejam um array, mesmo que vazio
    };

    Usuario.findByIdAndUpdate(id, updateData, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Não foi possível atualizar o usuário com o ID=${id}. Talvez o usuário não tenha sido encontrado!`
          });
        } 
        // else res.send({ message: "Usuário atualizado com sucesso." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar usuário com o ID=" + id
        });
      });
  } catch (err) {
    res.status(500).send({
      message: "Erro ao verificar a existência de usuários com o mesmo nome e e-mail."
    });
  }
};

// Retrieve all Usuarios from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};

  Usuario.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao buscar os usuarios."
      });
    });
};

// Find a single Usuario with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  Usuario.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Usuario com o ID " + id + " não encontrado." });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Erro ao buscar usuario com o ID " + id });
    });
};


// Delete a Usuario with the specified id in the request
// Delete a Usuario with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).send({
        message: `Não foi possível excluir o usuario com o ID=${id}. Usuario não encontrado!`
      });
    }

    // Verifica se o usuário é da disciplina "admin"
    const adminUsers = await Usuario.find({ 'isAdmin': true });
    if (adminUsers.length === 1 && adminUsers[0]._id.toString() === id) {
      return res.status(400).send({
        message: "Não é possível excluir o único usuário da disciplina admin."
      });
    }

    // Encontra todas as perguntas relacionadas ao usuário
    const perguntas = await Pergunta.find({ usuario: id });

    // Para cada pergunta, exclui os arquivos associados e a própria pergunta
    for (const pergunta of perguntas) {
      // Exclui os arquivos associados à pergunta
      for (const arquivoId of pergunta.arquivos) {
        const arquivo = await Arquivo.findById(arquivoId);
        if (arquivo) {
          // Remove o arquivo do sistema de arquivos
          const filePath = arquivo.nome;
          const directory = arquivo.nome.endsWith('.png') || arquivo.nome.endsWith('.ogg') ? 'jogo/img/pictures/' : 'jogo/audio/se/';
          const fullPath = `../back/${directory}${filePath}`;

          // Verifica se o arquivo existe antes de tentar excluí-lo
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error("Erro ao excluir o arquivo do sistema de arquivos:", err);
            }
          });
        }
        // Exclui o arquivo do banco de dados
        await Arquivo.findByIdAndRemove(arquivoId);
      }
      
      // Finalmente, exclui a própria pergunta
      await Pergunta.findByIdAndRemove(pergunta._id);
    }

    // Finalmente, exclui o usuário
    await Usuario.findByIdAndRemove(id);

    res.send({ message: "Usuario, perguntas e arquivos associados foram excluídos com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Não foi possível excluir o usuario com ID=" + id
    });
  }
};



// Ler o conteúdo do arquivo sendgrid.env e obter a chave de API
fs.readFile('./sendgrid.env', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo sendgrid.env:', err);
    return;
  }

  // Extrair a chave de API do conteúdo do arquivo
  const matches = data.match(/^SENDGRID_API_KEY=(.*)$/m);
  if (!matches || matches.length < 2) {
    console.error("Chave de API não encontrada no arquivo sendgrid.env.");
    return;
  }

  const apiKey = matches[1].trim();

  // Configurar a chave de API do SendGrid
  sgMail.setApiKey(apiKey);
});

// Função para verificar o e-mail no banco de dados e enviar o e-mail de recuperação
async function checkAndSendEmail(email) {
  try {
    // Procura o usuário com o e-mail fornecido
    const usuario = await Usuario.findOne({ email: email });

    // Se o usuário não for encontrado, exibe uma mensagem de erro
    if (!usuario) {
      console.error("Usuário com o e-mail especificado não encontrado.");
      return;
    }

    // Configuração do e-mail
    const msg = {
      to: usuario.email,
      from: 'xaprappozoiga-1310@yopmail.com',
      subject: 'Recuperação de Senha',
      text: 'Sua senha é: ' + usuario.senha,
      html: '<strong>Sua senha é: ' + usuario.senha + '</strong>',
    };

    // Enviar o e-mail
    console.log('Enviando e-mail...');
    await sgMail.send(msg);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao buscar usuário ou enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail de recuperação');
  }
}

// Função de recuperação de senha
exports.recuperarSenha = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ message: "O campo e-mail não pode estar vazio!" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).send({ message: "O e-mail fornecido não é válido!" });
    return;
  }

  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      res.status(404).send({ message: "Usuário com o e-mail especificado não encontrado." });
      return;
    }

    // Configuração do e-mail
    const msg = {
      to: usuario.email,
      from: 'xaprappozoiga-1310@yopmail.com',
      subject: 'Recuperação de Senha',
      text: 'Sua senha é: ' + usuario.senha,
      html: '<strong>Sua senha é: ' + usuario.senha + '</strong>',
    };

    // Enviar o e-mail
    console.log('Enviando e-mail...');
    await sgMail.send(msg);
    console.log('E-mail enviado com sucesso!');

    res.send({ message: 'E-mail de recuperação enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao buscar usuário ou enviar e-mail:', error);
    res.status(500).send({
      message: "Ocorreu um erro ao tentar enviar o e-mail de recuperação."
    });
  }
};
