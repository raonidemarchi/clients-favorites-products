const clientModel = 

module.exports = {
  up(db) {
    return db.collection('clients').insertMany([
      {
        name: 'Raoni Costa Demarchi',
        email: 'raonidemarchi@gmail.com',
        address: 'Rua João Iotti, 94',
        favorites_products: [
          '12398weuf', '321dsasfg', 'wq12e2213'
        ]
      },
      {
        name: 'Jorge Silva',
        email: 'jorge@gmail.com',
        address: 'Av. Dr. Adílson Rodrigues, 2445',
        favorites_products: {}
      }
    ])
  },

  down(db) {
    return db.collection('clients').drop()
  }
}
