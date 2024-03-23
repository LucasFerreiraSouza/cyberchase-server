const express = require('express')
const router = express.Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body || {}
  const person = { name, salary, approved }

  if (!name) res.status(422).json({ message: 'Erro: É obrigatório enviar o nome.' })
  if (!salary) res.status(422).json({ message: 'Erro: É obrigatório enviar o salário.' })

  try {
    await Person.create(person)

    res.status(201).json({ message: 'Novo usuário cadastrado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json({ people, message: 'Dados encontrados com sucesso!' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params || {}

    if (!id) res.status(422).json({ message: 'Erro: É obrigatório enviar o ID do usuário.' })

    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado' })
      return
    }

    res.status(200).json({ person, message: 'Usuário encontrados com sucesso!' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router