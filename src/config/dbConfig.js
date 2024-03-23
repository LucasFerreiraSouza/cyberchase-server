const mongoose = require('mongoose')

const dbConfig = "mongodb+srv://JoaoCarlos:joaocarlos@cluster0.fw9jgp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connection = mongoose.connect(dbConfig)
.then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
.catch(err => console.error('Erro ao conectar-se ao MongoDB:', err))

module.exports = connection