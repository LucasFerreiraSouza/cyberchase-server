const handleErrors = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Erro interno do servidor' })
}

const handleNotFound = (req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
}

module.exports = {
  handleErrors,
  handleNotFound
}