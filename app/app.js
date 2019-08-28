const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()

const loginRouter = require('./app/routes/login')
const clientRouter = require('./app/routes/client')

let server = {}

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/login', loginRouter)
app.use('/api/client', clientRouter)

server = http.createServer(app)
server.listen(process.env.PORT || 3000)
