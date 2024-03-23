const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Person = require("./models/Person");
//import { Person } from '../models/Person';


const app = express();
app.use(
    express.urlencoded({extended:true})
)
app.use(express.json());
app.listen(8080);

app.post('/person', async (req, res) => {
    const { name, salary, approved } = req.body || {}
  
    if (!name) res.status(422).json({ message: 'Erro: É obrigatório enviar o nome.' })
    if (!salary) res.status(422).json({ message: 'Erro: É obrigatório enviar o salário.' })
  
    try {
      await Person.create({ name, salary, approved })
  
      res.status(201).json({ message: 'Novo usuário cadastrado com sucesso!' })
    } catch (error) {
      res.status(500).json({ error })
    }
  })



mongoose.connect(
    "mongodb+srv://lucasferreirasouza22:d3Q0Tipi7gITx9Ej@cyberchase.nvugz34.mongodb.net/?retryWrites=true&w=majority&appName=cyberchase"
    ).then(() => {
        console.log('Connect with success on mongoDB')
        app.listen(3000)
      })
      .catch((err) => {
        console.log(err)
      })
