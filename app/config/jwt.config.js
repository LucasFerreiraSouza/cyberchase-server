require('dotenv').config();
const express = require('express')
const router = express.Router()
const tokenConfig = require('../config/jwt.config')
const jwt = require('jsonwebtoken');

module.exports.genreateToken = function genreateToken(user){

    const secretKey = process.env.TOKEN_SECRET;
    const payload = user
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 

    return token
}

module.exports.checkToken = function checkToken(req, res, next){
    const SECRET = process.env.TOKEN_SECRET
    const authHeader =  req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).json({msg: 'Acesso negado!'})
    
    try{
        jwt.verify(token, SECRET)
        next()
    }catch(err){
        res.status(400).json({msg: 'Token invalido!'})
    }
}

router.get('/validate-token/:TOKEN', tokenConfig.checkToken, (req, res) => {
    const SECRET = process.env.TOKEN_SECRET
    const TOKEN = req.params.TOKEN

    if(!TOKEN) return res.status(401).json({msg: 'Acesso negado!'})
    
    try{
        jwt.verify(TOKEN, SECRET)
        res.json(true)
    }catch(err){
        res.status(404).json(false)
    }
})

router.get('/decode-token/:TOKEN', tokenConfig.checkToken, async (req, res) => {
    const TOKEN = req.params.TOKEN
    const SECRET = process.env.TOKEN_SECRET

    const payload = await jwt.verify(TOKEN, SECRET, (err, decode) =>{
        if(err) console.log('ERROR: ' + err);
        else return decode
    })
    res.json(payload)
})

module.exports.router = router


