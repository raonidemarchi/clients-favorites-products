'use strict'
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()

const loginRouter = require('./routes/login')
const clientRouter = require('./routes/client')
const favoritesProductsRouter = require('./routes/favoritesProducts')

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/login', loginRouter)
app.use('/api/client', clientRouter)
app.use('/api/client/favorites_products', favoritesProductsRouter)

module.exports = app
