require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_NAME: process.env.DATABASE_NAME || 'clients_favorites_products',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017',
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  PRODUCT_API: 'http://challenge-api.luizalabs.com/api/product',
  PAGINATION_OPTIONS: {
    customLabels: {
      meta: 'meta',
      totalDocs: 'total',
      limit: 'page_size',
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false,
      totalPages: 'total_pages',
      prevPage: 'prev_page',
      nextPage: 'next_page'
    }
  }
}
