const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const app = express()
const { DATABASE_NAME, DATABASE_URL } = require('../config/config')

// create database connection
process.connection = mongoose.createConnection(
  DATABASE_URL + '/' + DATABASE_NAME,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
)

const loginRouter = require('./routes/login')
const clientRouter = require('./routes/client')
const favoritesProductsRouter = require('./routes/favorites_products')

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/login', loginRouter)
app.use('/api/client', clientRouter)
app.use('/api/client/favorites_products', favoritesProductsRouter)

module.exports = app
