const express = require('express')
const router = express.Router()
const clientModel = require('../models/client')
const verifyToken = require('../middlewares/verifyToken')
const verifyDuplicatedClientEmail = require('../middlewares/verifyDuplicatedClientEmail')

/* GET clients list */
router.get('/', verifyToken, async (req, res) => {
  const page = req.query.page || 1
  let clients = []

  try {
    clients = await clientModel.paginate(
      { active: true },
      {
        page: page,
        limit: 10,
        select: { favorites_products: false, active: false, createdDate: false }
      }
    )
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível trazer a lista de clientes.' })
  }

  return res.status(200).json(clients)
})

/* GET client by id */
router.get('/:id', verifyToken, async (req, res) => {
  let client = {}

  try {
    clients = await clientModel.findOne({ _id: req.params.id }, { favorites_products: false, active: false, createdDate: false })
  } catch(err) {
    return res.status(500).json({ message: 'Cliente não encontrado.' })
  }

  return res.status(200).json(client)
})

/* POST add a new client */
router.post('/', verifyToken, verifyDuplicatedClientEmail, async (req, res) => {
  let newClient = {}

  try {
    newClient = await clientModel.create(req.body)
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível adicionar um novo cliente.' })
  }

  return res.status(500).json(newClient)
})

/* UPDATE update a client information */
router.put('/:id', verifyToken, verifyDuplicatedClientEmail, async (req, res) => {
  let client = {}

  try {
    client = await clientModel.updateOne({ _id: req.params.id }, req.body)
  } catch(err) {
    return res.status(404).json({ message: 'Cliente não encontrado.' })
  }

  return res.status(200).json({ message: 'Dados do cliente alterados.', ...client })
})

/* DELETE remove a client */
router.delete('/:id', verifyToken, async (req, res) => {
  let client = {}

  try {
    client = await clientModel.updateOne({ _id: req.params.id }, { active: false })
  } catch(err) {
    return res.status(404).json({ message: 'Cliente não encontrado.' })
  }

  return res.status(200).json({ message: 'Cliente removido.', ...client })
})

module.exports = router
