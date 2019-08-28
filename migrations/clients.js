ObjectID = require('mongodb').ObjectID
ObjectId = new ObjectID()

module.exports = {
  async up(db) {
    await db.collection('clients').insertMany([
      {
        _id: new ObjectID('5d66ece2bbcdf150c8307d96'),
        nome: 'Raoni Costa Demarchi',
        email: 'raonidemarchi@gmail.com',
        endereco: 'Rua João Iotti, 94'
      }
    ])
  },

  async down(db) {
    
  }
}
