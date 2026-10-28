import { describe, expect, it } from 'vitest'
import { isDefined, isNullish } from './nullish'

describe('isNullish', () => {
  it('returns true for null and undefined', () => {
    expect(isNullish(null)).toBe(true)
    expect(isNullish(undefined)).toBe(true)
  })

  it('returns false for falsy non-nullish values', () => {
    expect(isNullish(0)).toBe(false)
    expect(isNullish('')).toBe(false)
    expect(isNullish(false)).toBe(false)
    expect(isNullish(NaN)).toBe(false)
  })
})

describe('isDefined', () => {
  it('returns false for null and undefined', () => {
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })

  it('returns true for falsy non-nullish values', () => {
    expect(isDefined(0)).toBe(true)
    expect(isDefined('')).toBe(true)
    expect(isDefined(false)).toBe(true)
  })

  it('filters nullish entries out of an array', () => {
    const input: Array<string | null | undefined> = ['a', null, undefined, 'b']
    expect(input.filter(isDefined)).toEqual(['a', 'b'])
  })
})
