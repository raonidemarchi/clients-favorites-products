const config = {
  mongodb: {
    url: 'mongodb://192.168.99.100:27017',
    databaseName: 'clients_favorites_products',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: './db/migrations',
  changelogCollectionName: 'changelog'
};

module.exports = config;
