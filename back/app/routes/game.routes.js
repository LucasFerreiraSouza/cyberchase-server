const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/jogo', 'index.html'));
});



module.exports = router;