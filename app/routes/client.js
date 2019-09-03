const express = require('express')
const router = express.Router()
const clientModel = require('../models/client')
const verifyToken = require('../middlewares/verifyToken')
const verifyDuplicatedClientEmail = require('../middlewares/verifyDuplicatedClientEmail')
const { calculateOffset, createPaginationMetaResponse } = require('../helpers/helpers')

/* GET clients list */
router.get('/', verifyToken, async (req, res) => {
  const page = +req.query.page || 1
  const limit = 10
  const offset = calculateOffset(page, limit)
  let nextPage = null
  let clients = []

  try {
    clients = await clientModel.find(
      { active: true },
      { favorites_products: false, active: false, createdDate: false },
      { skip: offset, limit: limit + 1 }
    )
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível trazer a lista de clientes.' })
  }

  if (clients.length === limit + 1) {
    nextPage = page + 1
    clients.pop()
  }

  return res.status(200).json(
    {
      ...createPaginationMetaResponse(page, clients.length, nextPage),
      clients
    }
  )
})

/* GET client by id */
router.get('/:id', verifyToken, async (req, res) => {
  let client = {}

  try {
    client = await clientModel.findOne({ _id: req.params.id, active: true }, { favorites_products: false, active: false, createdDate: false })
  } catch(err) {
    return res.status(404).json({ message: 'Cliente não encontrado.' })
  }

  if (!client) {
    return res.status(404).json({ message: 'Cliente não encontrado.' })
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

  return res.status(200).json(newClient)
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
