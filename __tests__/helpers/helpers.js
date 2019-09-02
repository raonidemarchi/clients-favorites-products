const faker = require('faker')

function generateFakeUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress()
  }
}

module.exports = {
  generateFakeUser
}
