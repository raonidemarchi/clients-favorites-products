module.exports = {
  up(db) {
    db.collection('favorites_products').insertMany([
      {
        user_id: new ObjectID('5d66ece2bbcdf150c8307d96'),
        product_id: '12398weuf'
      }
    ])
  },

  down(db) {
    
  }
}
