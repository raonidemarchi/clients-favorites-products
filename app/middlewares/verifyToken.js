const { validateToken } = require('../helpers/helpers')

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  
  if (!verifyToken(token)) {
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' })
  }

  next()
}

module.exports = verifyToken
