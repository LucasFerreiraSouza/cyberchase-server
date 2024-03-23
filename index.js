const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require('./routes/person-routes')

const app = express();
app.use(
    express.urlencoded({extended:true})
)
app.use(express.json());
app.use('/person', personRoutes)

app.listen(8080);


mongoose.connect(
    "mongodb+srv://lucasferreirasouza22:d3Q0Tipi7gITx9Ej@cyberchase.nvugz34.mongodb.net/?retryWrites=true&w=majority&appName=cyberchase"
    ).then(() => {
        console.log('Connect with success on mongoDB')
        app.listen(3000)
      })
      .catch((err) => {
        console.log(err)
      })
