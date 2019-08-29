function clientModel() {
	const mongoose = require('mongoose')
	const Schema = mongoose.Schema

	const _schema = {
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
	}

	const newSchema = new Schema(_schema, { versionKey: false })
	const newModel = process.connection.model('client', newSchema)

	return newModel
}

module.exports = clientModel
