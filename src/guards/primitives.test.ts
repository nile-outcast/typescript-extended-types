import { describe, expect, it } from 'vitest'
import { isBoolean, isNumber, isString } from './primitives'

describe('isString', () => {
  it('accepts strings, including empty ones', () => {
    expect(isString('')).toBe(true)
    expect(isString('hello')).toBe(true)
  })

  it('rejects boxed strings and other types', () => {
    expect(isString(new String('x'))).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString(null)).toBe(false)
  })
})

describe('isNumber', () => {
  it('accepts finite numbers, zero, and infinities', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-1.5)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
  })

  it('rejects NaN', () => {
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber(Number.NaN)).toBe(false)
  })

  it('rejects numeric strings, boxed numbers and bigint', () => {
    expect(isNumber('42')).toBe(false)
    expect(isNumber(new Number(1))).toBe(false)
    expect(isNumber(1n)).toBe(false)
  })
})

describe('isBoolean', () => {
  it('accepts only true and false', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('rejects truthy and falsy non-boolean values', () => {
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('')).toBe(false)
    expect(isBoolean(null)).toBe(false)
  })
})
