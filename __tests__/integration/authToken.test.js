const { generateToken, validateToken } = require('../../app/helpers/helpers')

describe('Auth token', () => {
  it('Should autheticate with a valid JWT token', () => {
    const token = generateToken()
    const tokenValid = validateToken(token)
    
    expect(tokenValid).toBe(true)
  })

  it('Should not autheticate with an empty JWT token', () => {
    const tokenValid = validateToken()
    
    expect(tokenValid).toBe(false)
  })

  it('Should not autheticate with an invalid JWT token', () => {
    const token = generateToken()
    const tokenValid = validateToken(token + 'asddas')
    
    expect(tokenValid).toBe(false)
  })
})
