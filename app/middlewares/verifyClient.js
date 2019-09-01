const clientModel = require('../models/client')

async function verifyClient(req, res, next) {
  let client = {}

  try {
    client = await clientModel.findOne({ _id: req.params.id }, '_id')
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível verificar o cadastro do cliente.' })
  }

  console.log(req.params.id)

  if (client && Object.entries(client).length === 0) {
    return res.status(404).json({ message: 'Cliente não encontrado.' })
  }

  next()
}

module.exports = verifyClient
