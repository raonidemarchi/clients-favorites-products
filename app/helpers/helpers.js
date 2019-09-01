const axios = require('axios')
const mongoose = require('mongoose')
const { DATABASE_NAME, DATABASE_URL, TOKEN_SECRET } = require('../../config/config')

function createDbConnection() {
  return mongoose.createConnection(
    `${DATABASE_URL}/${DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
}

function generateToken() {
  return jwt.sign({}, TOKEN_SECRET, {
    expiresIn: '120 days'
  })
}

function validateProductById(id = '') {
  return new Promise(async resolve => {
    let result = {}
    
    try {
      result = await axios.get(`http://challenge-api.luizalabs.com/api/product/${id}`)
    } catch(error) {
      return resolve(false)
    }

    return resolve(result.data);
  })
}

function searchClientFavoriteProduct(clientData = {}, product_id = '') {
  if (clientData.favorites_products.length === 0) {
    return false
  }

  return clientData.favorites_products.find(clientInfo => clientInfo.id === product_id)
}

module.exports = {
  createDbConnection,
  generateToken,
  validateProductById,
  searchClientFavoriteProduct
}
