import { isValidUUID, parseAcceptLanguage } from './helper.util'

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

  describe('parseAcceptLanguage', () => {
    it('falls back to English without a header', () => {
      expect(parseAcceptLanguage(undefined)).toEqual(['en'])
      expect(parseAcceptLanguage('')).toEqual(['en'])
    })

    it('keeps primary subtags, ordered by quality, without duplicates', () => {
      expect(parseAcceptLanguage('nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7')).toEqual(['nl', 'en'])
      expect(parseAcceptLanguage('fr;q=0.5, de-CH')).toEqual(['de', 'fr', 'en'])
    })

    it('always includes English', () => {
      expect(parseAcceptLanguage('ja-JP')).toEqual(['ja', 'en'])
    })

    it('ignores wildcards, malformed tags and refused languages', () => {
      expect(parseAcceptLanguage('*, x-klingon, es;q=0, it')).toEqual(['it', 'en'])
    })
  })
})
