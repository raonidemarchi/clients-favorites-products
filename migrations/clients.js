const clientModel = require('../app/models/client')
const faker = require('faker')

module.exports = {
  up() {
    const clients = Array(30).fill().map(() => {
      return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress()
      }
    })

    return clientModel.insertMany(clients)
  },

  down(db) {
    return db.collection('clients').drop()
  }
}
