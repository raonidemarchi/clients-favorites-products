const { searchClientFavoriteProduct } = require('../../app/helpers/helpers')

describe('Favorite product search', () => {
  it('Should find a product inside the client favorite list', () => {
    const productId = '12345'
    const clientData = {
      favorites_products: [{
        id: '12345',
        name: 'Nome do produto'
      }]
    }
    const favoriteProduct = searchClientFavoriteProduct(clientData, productId)

    expect(favoriteProduct).toBe(clientData.favorites_products[0])
  })

  it('Should return false when the favorites products list is empty', () => {
    const favoriteProduct = searchClientFavoriteProduct()
    
    expect(favoriteProduct).toBe(false)
  })
})