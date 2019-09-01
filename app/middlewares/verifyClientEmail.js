const clientModel = require('../models/client')

async function verifyClientEmail(req, res, next) {
  let clientEmail = {}

  try {
    clientEmail = await clientModel.findOne({ email: req.body.email }, '_id')
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível verificar o email do cliente.' })
  }

  if (clientEmail && Object.entries(clientEmail).length > 0) {
    return res.status(500).json({ message: 'Email já cadastrado.' })
  }

  next()
}

module.exports = verifyClientEmail
