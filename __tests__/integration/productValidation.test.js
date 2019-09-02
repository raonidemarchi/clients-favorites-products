const { getProductById } = require('../../app/helpers/helpers')
const { PRODUCT_API } = require('../../config/config')
const axios = require('axios')

describe('Product validation', () => {
  it('Should return the product details', async () => {
    const productList = await axios.get(`${PRODUCT_API}/?page=1`)
    const firstProduct = productList.data.products[0]
    const productDetails = await getProductById(firstProduct.id)
    
    expect(Object.entries(productDetails).length).toBeGreaterThan(0)
  })

  it('Should not return the product details', async () => {
    let productDetails = {}

    try {
      productDetails = await getProductById()
    } catch(err) {
      expect(Object.entries(productDetails).length).toBe(0)
    }
  })
})
