const express = require('express')
const router = express.Router()
const { generateJWTToken } = require('../helpers/helpers')

/* POST autenticação */
router.post('/', (req, res) => {
  let token = ''

  // @TODO
  if (req.body.user === 'luiza' && req.body.pass === 'labs') {
    token = generateJWTToken()

    return res.status(200).send({ auth: true, token: token })
  }
  
  return res.status(500).send({ auth: false, error: 'Usuário ou senha inválido.' })
})

module.exports = router
