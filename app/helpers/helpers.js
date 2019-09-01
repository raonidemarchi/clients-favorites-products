const axios = require('axios')
const mongoose = require('mongoose')
const { DATABASE_NAME, DATABASE_URL, TOKEN_SECRET, PRODUCT_API } = require('../../config/config')

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
  return new Promise(async (resolve, reject) => {
    let result = {}

    try {
      result = await axios.get(`${PRODUCT_API}/${id}`)
    } catch(err) {
      return reject(err)
    }

    return resolve(result.data);
  })
}

function searchClientFavoriteProduct(clientData = {}, productId = '') {
  if (clientData.favorites_products.length === 0) {
    return false
  }

  return clientData.favorites_products.find(clientInfo => clientInfo.id === productId)
}

module.exports = {
  createDbConnection,
  generateToken,
  validateProductById,
  searchClientFavoriteProduct
}
