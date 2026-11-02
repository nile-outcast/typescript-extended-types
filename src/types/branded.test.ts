import { describe, expect, it } from 'vitest'
import { toJsonString } from './branded'

describe('toJsonString', () => {
  it('returns the JSON representation of the value', () => {
    expect(toJsonString({ id: 1 })).toBe('{"id":1}')
    expect(toJsonString(['a', 'b'])).toBe('["a","b"]')
    expect(toJsonString('text')).toBe('"text"')
    expect(toJsonString(0)).toBe('0')
  })

  it('serializes null nested inside an object', () => {
    expect(toJsonString({ name: null })).toBe('{"name":null}')
  })

  it('throws a TypeError for values that stringify to undefined', () => {
    expect(() => toJsonString(undefined as never)).toThrow(TypeError)
    expect(() => toJsonString(() => 1 as never)).toThrow(TypeError)
    expect(() => toJsonString(Symbol('tag') as never)).toThrow(TypeError)
  })

  it('lets JSON.stringify report values it cannot represent', () => {
    expect(() => toJsonString(10n as never)).toThrow(TypeError)
  })
})
