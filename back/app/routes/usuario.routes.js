const checkToken = require('../utils/checkToken.js')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const tokenConfig = require('../config/jwt.config')
const db = require("../models");
const Usuario = db.usuarios;

module.exports = app => {
  const usuarios = require("../controllers/usuario.controller.js");

  var router = require("express").Router();

  router.post("/", checkToken, usuarios.create);

  router.get("/", checkToken, usuarios.findAll);

  router.get("/:id", checkToken, usuarios.findById);

  router.get('/find-by-email/:email', tokenConfig.checkToken, async (req, res)=>{
    if(req.params.email != undefined )
        await Usuario.findOne({ email: req.params.email }, '-password').then((user) => {
            if(user != null)
                res.json(user)
            else res.status(404).json({msg: 'User not found'})
    })
    else res.status(404).send('No email sent')
})

  router.put("/:id", checkToken, usuarios.update);

  router.delete("/:id", checkToken, usuarios.delete);
  
  router.post("/recuperar-senha", checkToken, usuarios.recuperarSenha);

  router.post('/set-new-password', checkToken, async (req, res) => {

    const salt = await bcrypt.genSalt(12)

    const newPassword = await bcrypt.hash(req.body.password, salt)
    const userCreated = await Usuario.findOneAndUpdate({ email: req.body.email }, {password: newPassword});   

    res.json(userCreated)
  })

  router.get('/forgot-password/:email', checkToken, async (req, res) => {

    console.log("BUSCANDO: "+req.params.email );
    
      const userWhoForgot = await Usuario.findOne({email: req.params.email}, '-password')

      if(userWhoForgot){        
          
          const TOKEN = tokenConfig.genreateToken( { email: userWhoForgot.email } )

          const transporter = nodemailer.createTransport({
              service: 'gmail', 
              auth: {
                  user: process.env.EMAIL_USER, 
                  pass: process.env.EMAIL_PASS 
              },
              tls: {
                  rejectUnauthorized: false 
              }
          });
          console.log("USUARIO QUE ENVIOU O EMAIL: "+process.env.EMAIL_USER);
          
          const mailOptions = {
              from: process.env.EMAIL_USER,      
              to: userWhoForgot.email,    
              subject: 'Password reset request',       
              text: 'You are receiving this e-mail because you requested to reset your password', 
              html: `<a href="${process.env.FRONTEND_HOST}/reset_password?TOKEN=${TOKEN}">Click here to access the page to reset your password</a>`
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Email enviado: ' + info.response);
          });
          
          res.json(userWhoForgot)
      }
      else{
          res.status(404).send("message: User not found")
      }
  })

  app.use("/api/usuarios", router);
};
