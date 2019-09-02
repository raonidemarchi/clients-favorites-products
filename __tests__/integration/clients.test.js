const request = require('supertest')
const app = require('../../app/app')
const clientModel = require('../../app/models/client')
const { generateToken } = require('../../app/helpers/helpers')
const token = generateToken()

describe('Clients', () => {
  it('Should list all clients', async () => {
    const response = await request(app)
      .get('/api/client')
      .set('X-Access-Token', token)

    expect(response.status).toBe(200)
  })

  it('Should insert a client', async () => {
    const response = await request(app)
      .post('/api/client')
      .set('X-Access-Token', token)
      .send({
        name: 'Raoni Demarchi',
        email: 'raonidemarchi@gmail.com',
        address: 'Rua x, 123'
      })
    
    await clientModel.deleteOne({ _id: response.body._id })

    expect(response.status).toBe(200)
    expect(typeof response.body._id).toBe('string')
  })

  it('Should get a client by id', async () => {
    const client = await clientModel.create({
      name: 'Raoni Demarchi',
      email: 'raonidemarchi2@gmail.com',
      address: 'Rua x, 123'
    })

    const response = await request(app)
      .get(`/api/client/${client._id}`)
      .set('X-Access-Token', token)
    
    await clientModel.deleteOne({ _id: response.body._id })

    expect(response.status).toBe(200)
    expect(client._id.toString()).toBe(response.body._id)
  })

  it('Should update client information', async () => {
    const client = await clientModel.create({
      name: 'Raoni Demarchi',
      email: 'raonidemarchi3@gmail.com',
      address: 'Rua x, 123'
    })

    const response = await request(app)
      .put(`/api/client/${client._id}`)
      .set('X-Access-Token', token)
      .send({
        name: 'Raoni Costa',
        email: 'raonidemarchi@hotmail.com',
        address: 'rua y, 125'
      })

    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(200)
  })

  it('Should inactivate a client', async () => {
    const client = await clientModel.create({
      name: 'Raoni Demarchi',
      email: 'raonidemarchi4@gmail.com',
      address: 'Rua x, 123'
    })

    const response = await request(app)
      .delete(`/api/client/${client._id}`)
      .set('X-Access-Token', token)
      
    await clientModel.deleteOne({ _id: client._id })

    expect(response.status).toBe(200)
  })
})
