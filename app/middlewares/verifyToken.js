const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../../config/config')

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' })
    }

    req.user_id = decoded.id
    next()
  })
}

module.exports = verifyToken
