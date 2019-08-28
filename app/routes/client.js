const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient
const { verifyJWT } = require('../helpers/helpers')
const { DATABASE_NAME, DATABASE_URL } = require('../../config/db-config')

/* GET lista de clientes */
router.get('/', verifyJWT, (req, res) => {
  mongodb.connect(DATABASE_URL, { useNewUrlParser: true }, (err, db) => {
    let dbo = {}

    if (err) {
      throw err
    }

    dbo = db.db(DATABASE_NAME)
    
    dbo.collection('clients').find({}).toArray((err, result) => {
      if (err) {
        throw err
      }
      
      res.status(200).send(result)
      db.close()
    })
  })
})

module.exports = router
