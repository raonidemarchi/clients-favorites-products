const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const { PORT } = require('../config/config')

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT)
})
