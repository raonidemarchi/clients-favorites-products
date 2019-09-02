const request = require('supertest')
const { generateFakeUser } = require('../helpers/helpers')
const axios = require('axios')
const app = require('../../app/app')
const clientModel = require('../../app/models/client')
const { PRODUCT_API } = require('../../config/config')
const { generateToken, getProductById } = require('../../app/helpers/helpers')
const token = generateToken()
let firstProductId = ''

beforeAll(async done => {
  const productList = await axios.get(`${PRODUCT_API}/?page=1`)
  firstProductId = productList.data.products[0].id

  done()
})

describe('Product validation', () => {
  it('Should return the product details', async () => {
    const productDetails = await getProductById(firstProductId)
    
    expect(Object.entries(productDetails).length).toBeGreaterThan(0)
  })

  it('Should not return the product details', async () => {
    try {
      await getProductById()
    } catch(err) {
      expect(typeof err.config).toBe('object')
    }
  })
})

describe('Clients favorites products', () => {
  it('Should get the list of favorites products', async () => {
    const client = await clientModel.create(generateFakeUser())

    const response = await request(app)
      .get(`/api/client/favorites_products/${client._id}`)
      .set('X-Access-Token', token)

    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(200)
  })

  it('Should add a product to favorites list', async () => {
    const client = await clientModel.create(generateFakeUser())

    const response = await request(app)
      .post(`/api/client/favorites_products/${client._id}/${firstProductId}`)
      .set('X-Access-Token', token)

    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(200)
  })

  it('Should not add an invalid product to favorites list', async () => {
    const client = await clientModel.create(generateFakeUser())

    const response = await request(app)
      .post(`/api/client/favorites_products/${client._id}/089123jksadhk`)
      .set('X-Access-Token', token)

    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(404)
  })

  it('Should not add a product that is already on the favorites list', async () => {
    const client = await clientModel.create(generateFakeUser())

    await request(app)
      .post(`/api/client/favorites_products/${client._id}/${firstProductId}`)
      .set('X-Access-Token', token)

    const duplicatedInsert = await request(app)
      .post(`/api/client/favorites_products/${client._id}/${firstProductId}`)
      .set('X-Access-Token', token)

    await clientModel.deleteOne({ _id: client._id })

    expect(duplicatedInsert.status).toBe(401)
  })
  
  it('Should not add a product to favorites list of an invalid client', async () => {
    const response = await request(app)
      .post(`/api/client/favorites_products/12390daklj/${firstProductId}`)
      .set('X-Access-Token', token)

    expect(response.status).toBe(404)
  })

  it('Should remove a product from favorites list', async () => {
    const client = await clientModel.create({
      ... generateFakeUser(),
      favorites_products: [{
        id: firstProductId
      }]
    })

    const response = await request(app)
      .delete(`/api/client/favorites_products/${client._id}/${firstProductId}`)
      .set('X-Access-Token', token)

    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(200)
  })

  it('Should not remove a product from favorites list of an invalid client', async () => {
    const response = await request(app)
      .delete(`/api/client/favorites_products/jçl123ouasd8p/${firstProductId}`)
      .set('X-Access-Token', token)

    expect(response.status).toBe(404)
  })

  it('Should not remove a product if it\'s not on the list favorites list', async () => {
    const client = await clientModel.create(generateFakeUser())

    const response = await request(app)
      .delete(`/api/client/favorites_products/${client._id}/lçk321nsdajp`)
      .set('X-Access-Token', token)

    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(404)
  })
})
