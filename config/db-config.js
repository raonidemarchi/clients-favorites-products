const DATABASE_NAME = process.env.DATABASE_NAME || 'clients_favorites_products'
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://192.168.99.100:27017'

module.exports = {
  DATABASE_NAME,
  DATABASE_URL
}
