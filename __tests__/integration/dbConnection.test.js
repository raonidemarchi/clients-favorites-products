const { createDbConnection } = require('../../app/helpers/helpers')

describe('Database connection', () => {
  it('Should create a connection with mongodb', async () => {
    const connection = await createDbConnection()

    expect(connection._readyState).toBe(1)
  })
})
