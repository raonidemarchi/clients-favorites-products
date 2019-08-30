require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_NAME: process.env.DATABASE_NAME || 'clients_favorites_products',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://192.168.99.100:27017'
}
