const express = require('express')
const router = express.Router()
const clientModel = require('../models/client')
const verifyToken = require('../middlewares/verifyToken')
const { getProductById, searchClientFavoriteProduct } = require('../helpers/helpers')

/* GET list client's favorites products */
router.get('/:clientId', verifyToken, async (req, res) => {
  let favoritesProducts = {}

  try {
    favoritesProducts = await clientModel.findOne({ _id: req.params.clientId }, 'favorites_products')
  } catch(err) {
    return res.status(500).json({ message: 'Não foi possível encontrar a lista de favoritos desse cliente.' })
  }

  return res.status(200).json(favoritesProducts.favorites_products)
})

/* POST add product to favorites */
router.post('/:clientId/:productId', verifyToken, async (req, res) => {
  const clientId = req.params.clientId
  const productId = req.params.productId
  let favoriteProduct = {}
  let client = {}
  let favoriteProductUtilData = {}

  try {
    [favoriteProduct, client] = await Promise.all([
      getProductById(productId),
      clientModel.findOne({ _id: clientId }, 'favorites_products')
    ])
  } catch(err) {
    if (Object.entries(favoriteProduct).length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' })
    }

    if (Object.entries(client).length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }
  }

  if (searchClientFavoriteProduct(client, productId)) {
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
    await clientModel.updateOne({ _id: clientId }, { $push: { favorites_products: favoriteProductUtilData } })
  } catch(err) {
    return res.status(500).json({ message: 'Houve um problema ao inserir o produto à lista de favoritos.' })
  }
    
  return res.status(200).json({ message: 'Produto adicinado aos favoritos.' })
})

/* DELETE remove product from favorites */
router.delete('/:clientId/:productId', verifyToken, async (req, res) => {
  const clientId = req.params.clientId
  const productId = req.params.productId
  let client, product = {}

  try {
    [client, product] = Promise.all([
      clientModel.findOne({ _id: clientId }, '_id'),
      clientModel.findOne({ _id: clientId, 'favorites_products.id': productId }, '_id')
    ])
  } catch(err) {
    if (Object.entries(client).length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }

    if (Object.entries(product).length === 0) {
      return res.status(404).json({ message: 'Este produto não está na lista de favoritos desse usuário.' })
    }
  }
  
  try {
    await clientModel.update({ _id: clientId }, { $pull: { favorites_products: { id: productId } } })
  } catch(err) {
    return res.status(500).json({ message: 'Houve um problema ao remover o produto da lista de favoritos.' })
  }
  
  return res.status(200).json({ message: 'Produto removido dos favoritos.' })
})

module.exports = router
