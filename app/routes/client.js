const express = require('express')
const router = express.Router()
const clientModel = require('../models/client')()
const { verifyJWT, validateProductById } = require('../helpers/helpers')

/* GET clients list */
router.get('/', verifyJWT, (req, res) => {
  clientModel.find({ active: true }, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Não foi possível trazer a lista de usuários' })
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

/* GET list client's favorites products */
router.get('/favorites_products/:client_id', verifyJWT, (req, res) => {
  clientModel.findOne({ _id: req.params.client_id }, 'favorites_products', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Não foi possível trazer a lista de produtos favoritos' })
    }

    return res.status(200).json(data)
  })
})

/* POST add product to favorites */
router.post('/favorite_product/:client_id/:product_id', verifyJWT, async (req, res) => {
  const client_id = req.params.client_id
  const product_id = req.params.product_id
  const favoriteProduct = await validateProductById(product_id)
  let favoriteProductUtilData = {}

  if (!favoriteProduct) {
    return res.status(404).json({ message: 'Produto não encontrado.' })
  }

  favoriteProductUtilData = {
    id: favoriteProduct.id,
    title: favoriteProduct.title,
    image: favoriteProduct.image,
    price: favoriteProduct.price,
    reviewScore: favoriteProduct.reviewScore
  }

  clientModel.updateOne(
    {
      _id: client_id,
      'favorites_products.id': {
        $nin: [product_id]
      }
    },
    {
      $push: {
        favorites_products: favoriteProductUtilData
      }
    }, (err, data) => {
      if (err) {
        return res.status(404).json({ message: 'Cliente não encontrado.' })
      }

      if (data.nModified === 0) {
        return res.status(200).json({ message: 'Esse produto já está nos favoritos desse cliente.' })
      }
      
      return res.status(200).json({ message: 'Produto adicinado aos favoritos.' })
    }
  )
})

module.exports = router
