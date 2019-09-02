const request = require('supertest')
const app = require('../../app/app')

describe('Authorization', () => {
  it('Should not access API with invalid token', async () => {
    const response = await request(app)
      .get('/api/client')
      .set('X-Access-Token', '12863')

    expect(response.status).toBe(401)
  })

  it('Should not access API with empty token', async () => {
    const response = await request(app)
      .get('/api/client')

    expect(response.status).toBe(401)
  })
})
