import { describe, expect, it } from 'vitest'
import { isOneOf } from './literals'

describe('isOneOf', () => {
  const isStatus = isOneOf(['idle', 'busy'] as const)

  it('accepts values from the list', () => {
    expect(isStatus('idle')).toBe(true)
    expect(isStatus('busy')).toBe(true)
  })

  it('rejects values outside the list', () => {
    expect(isStatus('done')).toBe(false)
    expect(isStatus('IDLE')).toBe(false)
    expect(isStatus(undefined)).toBe(false)
  })

  it('matches by strict equality without coercion', () => {
    const isOne = isOneOf([1, 2] as const)
    expect(isOne(1)).toBe(true)
    expect(isOne('1')).toBe(false)
  })

  it('matches NaN and treats +0 and -0 as equal (SameValueZero)', () => {
    const isSpecial = isOneOf([NaN, 0] as const)
    expect(isSpecial(NaN)).toBe(true)
    expect(isSpecial(-0)).toBe(true)
  })

  it('returns false for an empty options list', () => {
    const isNever = isOneOf([] as const)
    expect(isNever('anything')).toBe(false)
  })

  it('filters an array down to the allowed values', () => {
    const input: Array<string> = ['idle', 'done', 'busy']
    expect(input.filter(isStatus)).toEqual(['idle', 'busy'])
  })
})
