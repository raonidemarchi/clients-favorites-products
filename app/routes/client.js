const express = require('express')
const router = express.Router()
const { verifyJWT } = require('../helpers/helpers')
const mongodb = require('mongodb').MongoClient
const databaseUrl = process.env.DATABASE_URL || 'mongodb://192.168.99.100/'

/* GET lista de clientes */
router.get('/', verifyJWT, (req, res) => {
  
  mongodb.connect(databaseUrl, { useNewUrlParser: true }, (err, db) => {
    let dbo = {}

    if (err) {
      throw err
    }

    dbo = db.db('iv2-makeiteasy')
    
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
