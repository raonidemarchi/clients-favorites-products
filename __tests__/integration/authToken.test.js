const { generateToken, validateToken } = require('../../app/helpers/helpers')

describe('Auth token', () => {
  it('Should autheticate with a valid JWT token', async () => {
    const token = generateToken()
    const tokenValid = validateToken(token)
    
    expect(tokenValid).toBe(true)
  })
})
