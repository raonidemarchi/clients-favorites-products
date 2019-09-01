const clientModel = require('../models/client')

async function verifyDuplicatedClientEmail(req, res, next) {
  const clientId = req.params.id || null
  const email = req.body.email || null
  let clientEmail = {}

  try {
    clientEmail = await clientModel.findOne({ _id: { $ne: clientId }, email }, '_id')
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível verificar o email do cliente.' })
  }

  if (clientEmail && Object.entries(clientEmail).length > 0) {
    return res.status(500).json({ message: 'Email já cadastrado.' })
  }

  next()
}

module.exports = verifyDuplicatedClientEmail
