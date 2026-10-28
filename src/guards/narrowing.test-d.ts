import { expectTypeOf, test } from 'vitest'
import {
  isBoolean,
  isDate,
  isDefined,
  isEmptyObject,
  isFunction,
  isKeyOf,
  isNullish,
  isNumber,
  isObject,
  isOneOf,
  isPromise,
  isString,
} from '../index'
import type { BaseObject, Nullish } from '../types/basic'

test('isNullish narrows both branches', () => {
  const value = null as string | null | undefined

  if (isNullish(value)) {
    expectTypeOf(value).toEqualTypeOf<Nullish>()
  } else {
    expectTypeOf(value).toEqualTypeOf<string>()
  }
})

test('isDefined narrows both branches', () => {
  const value = null as string | null | undefined

  if (isDefined(value)) {
    expectTypeOf(value).toEqualTypeOf<string>()
  } else {
    expectTypeOf(value).toEqualTypeOf<null | undefined>()
  }
})

test('isDefined works with Array#filter', () => {
  const values = [] as Array<string | null | undefined>

  expectTypeOf(values.filter(isDefined)).toEqualTypeOf<Array<string>>()
})

test('isDefined works with Array#filter for number | undefined', () => {
  const values = [] as Array<number | undefined>

  expectTypeOf(values.filter(isDefined)).toEqualTypeOf<Array<number>>()
})

test('primitive guards narrow unknown', () => {
  const value = null as unknown

  if (isString(value)) {
    expectTypeOf(value).toEqualTypeOf<string>()
  }
  if (isNumber(value)) {
    expectTypeOf(value).toEqualTypeOf<number>()
  }
  if (isBoolean(value)) {
    expectTypeOf(value).toEqualTypeOf<boolean>()
  }
})

test('primitive guards narrow the else branch', () => {
  const value = '' as string | number

  if (isString(value)) {
    expectTypeOf(value).toEqualTypeOf<string>()
  } else {
    expectTypeOf(value).toEqualTypeOf<number>()
  }
})

test('isObject narrows unknown to BaseObject', () => {
  const value = null as unknown

  if (isObject(value)) {
    expectTypeOf(value).toEqualTypeOf<BaseObject>()
  }
})

test('isEmptyObject narrows to BaseObject<never>', () => {
  const value = null as unknown

  if (isEmptyObject(value)) {
    expectTypeOf(value).toEqualTypeOf<BaseObject<never>>()
  }
})

test('isFunction narrows unknown to a callable', () => {
  const value = null as unknown

  if (isFunction(value)) {
    expectTypeOf(value).toEqualTypeOf<(...args: Array<never>) => unknown>()
  }
})

test('isPromise narrows unknown to PromiseLike', () => {
  const value = null as unknown

  if (isPromise(value)) {
    expectTypeOf(value).toEqualTypeOf<PromiseLike<unknown>>()
  }
})

test('isDate narrows unknown to Date', () => {
  const value = null as unknown

  if (isDate(value)) {
    expectTypeOf(value).toEqualTypeOf<Date>()
  }
})

test('isKeyOf narrows the key to keyof the object', () => {
  const user = { id: 1, name: 'Ann' }
  const key = null as unknown

  if (isKeyOf(user, key)) {
    expectTypeOf(key).toEqualTypeOf<'id' | 'name'>()
  }
})

test('isOneOf narrows to the union of literal options', () => {
  const isStatus = isOneOf(['idle', 'busy'] as const)
  const value = '' as string

  if (isStatus(value)) {
    expectTypeOf(value).toEqualTypeOf<'idle' | 'busy'>()
  }
})
