const express = require('express')
const router = express.Router()
const { generateToken } = require('../helpers/helpers')

/* POST autenticação */
router.post('/', (req, res) => {
  let token = ''

  if (req.body.user === 'luiza' && req.body.pass === 'labs') {
    token = generateToken()
    return res.status(200).send({ auth: true, token: token })
  }
  
  return res.status(500).send({ auth: false, error: 'Usuário ou senha inválido.' })
})

module.exports = router
