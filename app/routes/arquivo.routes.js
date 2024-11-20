const checkToken = require('../utils/checkToken.js');
const axios = require("axios");
const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config();

// Routes
module.exports = app => {
  const arquivos = require("../controllers/arquivo.controller.js");

  var router = require("express").Router();

  // CRUD Endpoints para Arquivos

  
  router.get("/", checkToken, arquivos.findAll);
  router.get("/:id", checkToken, arquivos.findById);


// CRUD Endpoints para Arquivos
router.post("/", checkToken, async (req, res) => {
  try {
    // Executa a atualização de arquivos antes da criação
    //await app.locals.updateArchives();
    
    // Chama a função de criação de arquivos
    await arquivos.create(req, res);
  } catch (error) {
    console.error("Erro ao processar a requisição:", error.message);
    res.status(500).send('Erro ao processar a requisição.');
  }
});

// Atualização de arquivos (PUT)
router.put("/:id", checkToken, async (req, res) => {
  try {
    // Chama a função de atualização de arquivos, se necessário
    //await app.locals.updateArchives();

    // Chama a função de atualização de arquivos
    await arquivos.update(req.params.id, req.body, res); // Assume que arquivos.update aceita esses parâmetros
  } catch (error) {
    console.error("Erro ao processar a requisição:", error.message);
    res.status(500).send('Erro ao processar a requisição.');
  }
});

// Deletar arquivo (DELETE)
router.delete("/:id", checkToken, async (req, res) => {
  try {
    // Chama a função de exclusão de arquivos
    await arquivos.delete(req.params.id, res);

    // Executa a atualização de arquivos após a exclusão (se necessário)
    //await app.locals.updateArchives();
  } catch (error) {
    console.error("Erro ao processar a requisição:", error.message);
    res.status(500).send('Erro ao processar a requisição.');
  }
});
  // Atualizar perguntas
  router.get("/update-questions", checkToken, async (req, res) => {
    try {
      await app.locals.updateQuestions();
      res.json({ message: "Perguntas atualizadas com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar perguntas:", error.message);
      res.status(500).send('Erro ao atualizar perguntas.');
    }
  });

  // Atualizar arquivos do jogo
  router.get("/update-archives", checkToken, async (req, res) => {
    try {
      await app.locals.updateArchives();
      res.json({ message: "Arquivos do jogo atualizados com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar arquivos do jogo:", error.message);
      res.status(500).send('Erro ao atualizar arquivos do jogo.');
    }
  });

 
  // Prefix for all routes in this router
  app.use("/api/arquivos", router);
};

// Função para atualizar arquivos do jogo
module.exports.updateArchives = async function updateArchives() {
  try {
    const response = await axios.get(process.env.SERVER + '/api/arquivos', {
      headers: {
        "Authorization": "Bearer " + process.env.TOKEN
      }
    });

    if (response.status === 200) {
      const arquivos = response.data;
      const processedFiles = new Set(); // Conjunto para armazenar nomes de arquivos já processados

      // Verifica quais arquivos já existem no diretório antes de processar
      const existingFiles = fs.readdirSync('./jogo/img/pictures/').concat(fs.readdirSync('./jogo/audio/se/'));

      // Processar arquivos locais com Base64
      let delay = 500; // 1 segundo de atraso
      let counter = 0;

      for (const arquivo of arquivos) {
        if (!arquivo || !arquivo.nome || !arquivo.base64) {
          console.warn(`Arquivo com dados incompletos: ${JSON.stringify(arquivo)}`);
          continue;
        }

        // Ignora arquivos já processados
        if (existingFiles.includes(arquivo.nome) || processedFiles.has(arquivo.nome)) {
          //console.log(`Arquivo ${arquivo.nome} já processado, ignorando...`);
          continue;
        }

        await new Promise(resolve => setTimeout(resolve, delay));

        const base64Data = arquivo.base64.replace(/^data:.+;base64,/, '');
        const destinationPath = arquivo.nome.includes('.ogg') ? './jogo/audio/se/' : './jogo/img/pictures/';

        fs.writeFileSync(destinationPath + arquivo.nome, Buffer.from(base64Data, 'base64'));
        console.log(`Arquivo ${arquivo.nome} salvo em ${destinationPath}`);

        processedFiles.add(arquivo.nome); // Adiciona o arquivo ao conjunto de processados

        counter++;
        //console.log(`Progresso: ${counter}/${arquivos.length} arquivos processados.`);
      }
    } else {
      console.log('Falha ao obter os dados dos arquivos.');
    }
  } catch (error) {
    console.error('Erro ao atualizar arquivos:', error.message);
  }
};


// Função para atualizar perguntas
module.exports.updateQuestions = async function updateQuestions() {
  try {
    const response = await axios.get(process.env.SERVER + '/api/perguntas', {
      headers: {
        "Authorization": "Bearer " + process.env.TOKEN
      }
    });

    if (response.status === 200) {
      const questionDatabase = response.data;
      const filePath = './jogo/js/plugins/questionDatabase.js';

      // Criando o arquivo questionDatabase.js
      fs.writeFileSync(
        filePath,
        `var questionDatabase = {"Questions" : ${JSON.stringify(questionDatabase, null, 4)}}\n\n//`
      );
      console.log(`Arquivo ${filePath} criado com sucesso!`);

      let counter = 0;

      for (const question of questionDatabase) {
        counter++;
        //console.log(`Progresso: ${counter}/${questionDatabase.length} perguntas processadas.`);
      }
    } else {
      console.log('Falha ao obter os dados das perguntas.');
    }
  } catch (error) {
    console.error('Erro ao atualizar perguntas:', error.message);
  }
};

// Função para download de arquivos
module.exports.downloadFile = async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  try {
    const response = await axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        'User-Agent': 'cyberchase-app',
        "Authorization": "Bearer " + process.env.TOKEN
      }
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(true));
      writer.on('error', (err) => {
        writer.destroy();
        reject(err);
      });
    });
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error.message);
    throw error;
  }
};
