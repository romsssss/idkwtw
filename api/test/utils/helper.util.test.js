const helper = require('../../src/utils/helper.util')

describe('Helper Utils', () => {
  describe('isValidUUID', () => {
    it('returns false when given an empty string', () => {
      expect(helper.isValidUUID('')).toBe(false)
    })

    it('returns false when given a null parameter', () => {
      expect(helper.isValidUUID(null)).toBe(false)
    })

    it('returns false when given an invalid syntax', () => {
      expect(helper.isValidUUID('not-a-valid-syntax')).toBe(false)
    })

    it('returns true when given a valid syntax', () => {
      expect(helper.isValidUUID('00000000-0000-0000-0000-000000000000')).toBe(true)
    })
  })
})
