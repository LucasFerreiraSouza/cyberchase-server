const Question = require('../models/Question')

// Função para criar uma nova pergunta
const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body)
    res.status(201).json(question)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Função para obter todas as perguntas
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Função para obter uma pergunta pelo ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    if (!question) {
      return res.status(404).json({ message: 'Pergunta não encontrada' })
    }
    res.json(question)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Função para atualizar uma pergunta pelo ID
const updateQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!question) {
      return res.status(404).json({ message: 'Pergunta não encontrada' })
    }
    res.json(question)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Função para deletar uma pergunta pelo ID
const deleteQuestionById = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id)
    if (!question) {
      return res.status(404).json({ message: 'Pergunta não encontrada' })
    }
    res.json({ message: 'Pergunta excluída com sucesso' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById
}
