const request = require('supertest')
const app = require('../../app/app')

describe('Authentication', () => {
  it('Should autheticate with a valid JWT token', () => {
    const token = generateToken()
    const tokenValid = validateToken(token)
    
    expect(tokenValid).toBe(true)
  })
})
