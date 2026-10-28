import { describe, expect, it } from 'vitest'
import {
  isDate,
  isEmptyObject,
  isFunction,
  isKeyOf,
  isObject,
  isPromise,
} from './objects'

describe('isObject', () => {
  it('accepts object literals and Object.create(Object.prototype)', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject(Object.create(Object.prototype))).toBe(true)
  })

  it('rejects null, arrays and primitives', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject('str')).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })

  it('rejects null-prototype objects', () => {
    expect(isObject(Object.create(null))).toBe(false)
  })

  it('rejects class instances, Map, Set and Date', () => {
    class Point {
      x = 0
    }
    expect(isObject(new Point())).toBe(false)
    expect(isObject(new Map())).toBe(false)
    expect(isObject(new Set())).toBe(false)
    expect(isObject(new Date())).toBe(false)
  })

  it('rejects functions', () => {
    expect(isObject(() => 1)).toBe(false)
  })
})

describe('isEmptyObject', () => {
  it('accepts plain objects without keys', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  it('rejects plain objects with keys', () => {
    expect(isEmptyObject({ a: undefined })).toBe(false)
  })

  it('ignores inherited properties', () => {
    const obj = Object.create({ inherited: 1 }) as object
    expect(isEmptyObject(obj)).toBe(false)
  })

  it('counts symbol-only objects as empty', () => {
    expect(isEmptyObject({ [Symbol('s')]: 1 })).toBe(true)
  })

  it('rejects non-plain objects even when they have no own keys', () => {
    expect(isEmptyObject(new Map())).toBe(false)
    expect(isEmptyObject(Object.create(null))).toBe(false)
    expect(isEmptyObject([])).toBe(false)
    expect(isEmptyObject(null)).toBe(false)
  })
})

describe('isFunction', () => {
  it('accepts arrow functions, named functions and classes', () => {
    expect(isFunction(() => 1)).toBe(true)
    expect(isFunction(function named() {})).toBe(true)
    expect(isFunction(class {})).toBe(true)
  })

  it('rejects non-functions', () => {
    expect(isFunction({})).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction('fn')).toBe(false)
  })
})

describe('isPromise', () => {
  it('accepts native promises', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true)
  })

  it('accepts thenables that are plain objects', () => {
    expect(isPromise({ then: () => {} })).toBe(true)
  })

  it('accepts thenables that are functions', () => {
    const fn = Object.assign(() => {}, { then: () => {} })
    expect(isPromise(fn)).toBe(true)
  })

  it('rejects objects where then is not a function', () => {
    expect(isPromise({ then: 1 })).toBe(false)
    expect(isPromise({})).toBe(false)
  })

  it('rejects primitives and null', () => {
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise('then')).toBe(false)
  })
})

describe('isDate', () => {
  it('accepts valid dates', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2026-01-01'))).toBe(true)
    expect(isDate(new Date(0))).toBe(true)
  })

  it('rejects Invalid Date', () => {
    expect(isDate(new Date('oops'))).toBe(false)
    expect(isDate(new Date(Number.NaN))).toBe(false)
  })

  it('rejects date strings and timestamps', () => {
    expect(isDate('2026-01-01')).toBe(false)
    expect(isDate(1767225600000)).toBe(false)
    expect(isDate(null)).toBe(false)
  })
})

describe('isKeyOf', () => {
  const user = { id: 1, name: 'Ann' }

  it('accepts own keys', () => {
    expect(isKeyOf(user, 'id')).toBe(true)
    expect(isKeyOf(user, 'name')).toBe(true)
  })

  it('rejects inherited keys', () => {
    expect(isKeyOf(user, 'toString')).toBe(false)
    expect(isKeyOf(user, 'constructor')).toBe(false)
  })

  it('rejects unknown keys', () => {
    expect(isKeyOf(user, 'email')).toBe(false)
  })

  it('rejects non-key values', () => {
    expect(isKeyOf(user, null)).toBe(false)
    expect(isKeyOf(user, {})).toBe(false)
    expect(isKeyOf(user, undefined)).toBe(false)
  })

  it('supports numeric and symbol keys', () => {
    const sym = Symbol('s')
    const obj = { 0: 'zero', [sym]: 'symbol' }
    expect(isKeyOf(obj, 0)).toBe(true)
    expect(isKeyOf(obj, sym)).toBe(true)
  })
})
