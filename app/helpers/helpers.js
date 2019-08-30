const jwt = require('jsonwebtoken')
const axios = require('axios')
const mongoose = require('mongoose')
const { DATABASE_NAME, DATABASE_URL } = require('../../config/config')

function createDbConnection() {
  return mongoose.createConnection(
    `${DATABASE_URL}/${DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
}

function generateJWTToken() {
  return jwt.sign({}, 'secret-key', {
    expiresIn: '120 days'
  })
}

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }

    req.user_id = decoded.id
    next()
  })
}

function validateProductById(id) {
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

module.exports = {
  createDbConnection,
  generateJWTToken,
  verifyJWT,
  validateProductById
}