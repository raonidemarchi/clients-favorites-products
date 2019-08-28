const express = require('express')
const router = express.Router()
const { verifyJWT } = require('../helpers/helpers')

/* GET lista de clientes */
router.get('/', verifyJWT, (req, res) => {
  res.send('respond with a resource 3')
})

module.exports = router
