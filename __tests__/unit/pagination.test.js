const { calculateOffset, createPaginationMetaResponse } = require('../../app/helpers/helpers')

describe('Pagination', () => {
  it('Should calculate the page offset', () => {
    const offset = calculateOffset(2, 10)

    expect(offset).toBe(10)
  })

  it('Should create an object of pagination metadata response', () => {
    const meta = createPaginationMetaResponse(3, 10, 4)
    const expectedObject = {
      meta: {
        page_number: 3,
        page_size: 10,
        next_page: 4,
      }
    }

    expect(JSON.stringify(meta)).toBe(JSON.stringify(expectedObject))
  })
})
