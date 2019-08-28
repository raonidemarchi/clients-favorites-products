const { DATABASE_NAME, DATABASE_URL } = require('./db-config')

const config = {
  mongodb: {
    url: DATABASE_URL,
    databaseName: DATABASE_NAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: './migrations',
  changelogCollectionName: 'changelog'
};

module.exports = config;
