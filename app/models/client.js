const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { createDbConnection } = require('../helpers/helpers')
const dbConnection = createDbConnection()
const { PAGINATION_OPTIONS } = require('../../config/config')

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

mongoosePaginate.paginate.options = PAGINATION_OPTIONS
PAGINATION_OPTIONS.customLabels.docs = 'clients'

schema.plugin(mongoosePaginate)

module.exports = dbConnection.model('client', schema)
