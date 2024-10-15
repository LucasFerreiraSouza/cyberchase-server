require('dotenv').config(); // Carregando as variáveis de ambiente

const express = require("express");
const cors = require("cors");
const path = require("path");
const arquivoRoutes = require('./app/routes/arquivo.routes');
const perguntaRoutes = require('./app/routes/pergunta.routes');
const fs = require('fs');
const axios = require("axios");
const checkToken = require('./app/utils/checkToken');
const { adminFunction } = require('./app/utils/admin'); // Função do admin

const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// Configurar body-parser para aceitar tamanhos maiores
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Lendo os allowedOrigins do .env e transformando em array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Adicionando as funções ao app.locals sem chamá-las
app.locals.updateQuestions = arquivoRoutes.updateQuestions; 
app.locals.updateArchives = arquivoRoutes.updateArchives; 

// Função para conectar ao banco de dados e iniciar o servidor
async function startServer() {
  try {
    // Configurações do Mongoose
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', false);

    // Aguarda a conexão ser estabelecida
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the database!");

    // Rotas e middleware
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.json({ message: "Welcome to cyberchase application." });
    });

    require("./app/routes/usuario.routes")(app);
    require("./app/routes/pergunta.routes")(app);
    require("./app/routes/arquivo.routes")(app);

    // Chamada da função adminFunction para inicialização de recursos administrativos
    adminFunction();

    app.use('/jogo', express.static(path.join(__dirname, 'jogo')));

    // Iniciar o servidor
    app.listen(PORT, async () => { // Torne a função assíncrona
      console.log(`Server is running on port ${PORT}.`);

      // Chamada inicial das funções de atualização
      await app.locals.updateQuestions();
      await app.locals.updateArchives();

      

    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Fecha o processo em caso de erro crítico
  }
}

// Iniciar o servidor
startServer();
