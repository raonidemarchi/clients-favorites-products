const request = require('supertest')
const app = require('../../app/app')
const { generateToken } = require('../../app/helpers/helpers')
const token = generateToken()

describe('Clients', () => {
  it('Should list all clients', async () => {
    const response = await request(app)
      .get('/api/client')
      .set('X-Access-Token', token)
      .send()

    console.log(response)

    expect(response.status).toBe(200)
  })
})
