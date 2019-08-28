const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

/* POST autenticação */
router.post('/', (req, res) => {
  let id = ''
  let token = ''

  if (req.body.user === 'raoni' && req.body.pass === 'adm') {
    id = 1
    token = jwt.sign({ id }, 'secret-key', {
      expiresIn: 600 // expira em 10 min
    })

    return res.status(200).send({ auth: true, token: token })
  }
  
  return res.status(500).send({ auth: false, error: 'Usuário ou senha inválido.' })
})

module.exports = router
