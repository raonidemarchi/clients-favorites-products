const express = require('express')
const router = express.Router()
const clientModel = require('../models/client')
const { verifyJWT } = require('../helpers/helpers')

/* GET clients list */
router.get('/', verifyJWT, (req, res) => {
  clientModel.find({ active: true }, { favorites_products: false }, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Não foi possível trazer a lista de usuários.' })
    }

    return res.status(200).json(data)
  })
})

/* GET client by id */
router.get('/:id', verifyJWT, (req, res) => {
  clientModel.findOne({ _id: req.params.id }, { favorites_products: false }, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Usuário não encontrado.' })
    }

    return res.status(200).json(data)
  })
})

/* POST add a new client */
router.post('/', verifyJWT, (req, res) => {
  clientModel.find({ email: req.body.email }, '_id', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Não foi possível verificar o email do cliente.' })
    }

    if (data.length > 0) {
      return res.status(500).json({ message: 'Email já cadastrado.' })
    }

    clientModel.create(req.body, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Não foi possível adicionar um novo cliente.' })
      }
  
      return res.status(500).json(data)
    })
  })
})

/* UPDATE update a client information */
router.put('/:id', verifyJWT, (req, res) => {
  clientModel.updateOne({ _id: req.params.id }, req.body, (err, data) => {
    if (err) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }
    
    return res.status(200).json(data)
  })
})

/* DELETE remove a client */
router.delete('/:id', verifyJWT, (req, res) => {
  clientModel.updateOne({ _id: req.params.id }, { active: false } , (err, data) => {
    if (err) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }
    
    return res.status(200).json({ message: 'Cliente removido.' })
  })
})

module.exports = router
