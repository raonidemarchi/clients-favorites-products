const express = require('express')
const router = express.Router()
const clientModel = require('../models/client')
const verifyToken = require('../middlewares/verifyToken')
const { validateProductById, searchClientFavoriteProduct } = require('../helpers/helpers')

/* GET list client's favorites products */
router.get('/:client_id', verifyToken, async (req, res) => {
  let favoritesProducts = {}

  try {
    favoritesProducts = await clientModel.findOne({ _id: req.params.client_id }, 'favorites_products')
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível encontrar a lista de favoritos desse cliente.' })
  }

  return res.status(200).json(favoritesProducts)
})

/* POST add product to favorites */
router.post('/:client_id/:product_id', verifyToken, async (req, res) => {
  const client_id = req.params.client_id
  const product_id = req.params.product_id
  let favoriteProduct = {}
  let client = {}
  let favoriteProductUtilData = {}

  try {
    [ favoriteProduct, client ] = await Promise.all([
      validateProductById(product_id),
      clientModel.findOne({ _id: client_id }, 'favorites_products')
    ])
  } catch(err) {
    return res.status(404).json({ message: 'Cliente não encontrado.' })
  }

  if (!favoriteProduct) {
    return res.status(404).json({ message: 'Produto não encontrado.' })
  }

  if (searchClientFavoriteProduct(client, product_id)) {
    return res.status(401).json({ message: 'Esse produto já está nos favoritos desse cliente.' })
  }

  favoriteProductUtilData = {
    id: favoriteProduct.id,
    title: favoriteProduct.title,
    image: favoriteProduct.image,
    price: favoriteProduct.price,
    reviewScore: favoriteProduct.reviewScore
  }

  try {
    await clientModel.updateOne({ _id: client_id }, { $push: { favorites_products: favoriteProductUtilData } })
  } catch(err) {
    return res.status(500).json({ message: 'Houve um problema ao inserir o novo produto à lista de favoritos.' })
  }
    
  return res.status(200).json({ message: 'Produto adicinado aos favoritos.' })
})

module.exports = router
