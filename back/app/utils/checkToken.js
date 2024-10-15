const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token ausente');
    return res.status(401).json({ msg: 'Acesso negado!' });
  }

  try {
    const decoded = jwt.verify(token, "Cyb3rCh$se"); // Cyberchase
    //console.log('Token válido:', decoded);
    next();
  } catch (err) {
    console.error('Erro ao verificar token:', err.message);
    res.status(400).json({ msg: 'Token inválido!', Token: token });
  }
};
