const mongoose = require('mongoose')
const { createDbConnection } = require('../helpers/helpers')
const dbConnection = createDbConnection()

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    
    email: {
      type: String,
      unique: true,
      required: true
    },
    
    address: {
      type: String,
      required: true
    },

    active: {
      type: Object,
      required: true,
      select: false,
      default: true
    },
    
    favorites_products: {
      type: Array,
      required: false,
      default: []
    },

    createdDate: {
      type: Date,
      required: true,
      select: false,
      default: Date.now
    },
  },

  {
    versionKey: false
  }
)

module.exports = dbConnection.model('client', schema)
