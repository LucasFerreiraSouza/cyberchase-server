const checkToken = require('../utils/checkToken.js');
const arquivoRoutes = require('../routes/arquivo.routes.js');

module.exports = app => {
  const perguntasController = require("../controllers/pergunta.controller.js");
  var router = require("express").Router();

  // Create a new Pergunta
  router.post("/", checkToken, async (req, res) => {
    try {
      await perguntasController.create(req, res); // Chama a função create do controlador de perguntas

      // Chamada das funções updateQuestions e updateArchives
      await arquivoRoutes.updateQuestions(); // Chama a função para atualizar perguntas
      await arquivoRoutes.updateArchives(); // Chama a função para atualizar perguntas


      // Se a resposta não foi enviada pelo controlador
      if (!res.headersSent) {
        res.status(201).json({ message: "Pergunta criada e arquivos atualizados com sucesso." });
      }
    } catch (error) {
      console.error(error); // Log de erro para depuração
      res.status(500).json({ message: "Erro ao criar pergunta." });
    }
  });

  // Retrieve all Perguntas
  router.get("/", checkToken, perguntasController.findAll);

  // Retrieve a single Pergunta with id
  router.get("/:id", checkToken, perguntasController.findById);

  // Update Pergunta with id
  router.put("/:id", checkToken, async (req, res) => {
    try {
      await perguntasController.update(req, res); // Chama a função update do controlador de perguntas

      // Chamada das funções updateQuestions e updateArchives
      await arquivoRoutes.updateQuestions(); // Chama a função para atualizar perguntas
      await arquivoRoutes.updateArchives(); // Chama a função para atualizar perguntas


      // Se a resposta não foi enviada pelo controlador
      if (!res.headersSent) {
        res.status(200).json({ message: "Pergunta atualizada e arquivos atualizados com sucesso." });
      }
    } catch (error) {
      console.error(error); // Log de erro para depuração
      res.status(500).json({ message: "Erro ao atualizar pergunta." });
    }
  });

  // Delete Pergunta with id
  router.delete("/:id", checkToken, async (req, res) => {
    try {
      await perguntasController.delete(req, res); // Chama a função delete do controlador de perguntas

      // Chamada das funções updateQuestions e updateArchives
      await arquivoRoutes.updateQuestions(); // Chama a função para atualizar perguntas
      await arquivoRoutes.updateArchives(); // Chama a função para atualizar perguntas

      // Se a resposta não foi enviada pelo controlador
      if (!res.headersSent) {
        res.status(200).json({ message: "Pergunta deletada e arquivos atualizados com sucesso." });
      }
    } catch (error) {
      console.error(error); // Log de erro para depuração
      res.status(500).json({ message: "Erro ao deletar pergunta." });
    }
  });

  app.use("/api/perguntas", router);
};
