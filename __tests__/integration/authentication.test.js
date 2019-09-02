const request = require('supertest')
const app = require('../../app/app')

describe('Authentication', () => {
  it('Should do login', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        user: 'luiza',
        pass: 'labs'
      })

    expect(response.status).toBe(200)
  })

  it('Should not do login', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        user: 'luiza2',
        pass: 'labs1'
      })

    expect(response.status).toBe(401)
  })
})
