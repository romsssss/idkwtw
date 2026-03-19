import { isValidUUID } from './helper.util'

describe('Helper Utils', () => {
  describe('isValidUUID', () => {
    it('returns false when given an empty string', () => {
      expect(isValidUUID('')).toBe(false)
    })

    it('returns false when given a null parameter', () => {
      expect(isValidUUID(null as unknown as string)).toBe(false)
    })

    it('returns false when given an invalid syntax', () => {
      expect(isValidUUID('not-a-valid-syntax')).toBe(false)
    })

    it('returns true when given a valid syntax', () => {
      expect(isValidUUID('00000000-0000-0000-0000-000000000000')).toBe(true)
    })
  })
})
