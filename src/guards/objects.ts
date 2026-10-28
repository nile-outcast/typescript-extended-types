import type { BaseObject } from '../types/basic'

/**
 * Checks whether a value is a plain object: created by an object literal,
 * `new Object()` or `Object.create(Object.prototype)`.
 *
 * Rejected: `null`, arrays, class instances, `Map`, `Set`, `Date`,
 * and objects with a `null` prototype (`Object.create(null)`).
 *
 * @example
 * ```ts
 * isObject({ a: 1 }) // true
 * isObject([]) // false
 * isObject(new Map()) // false
 * isObject(Object.create(null)) // false
 * ```
 */
export function isObject(value: unknown): value is BaseObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}

/**
 * Checks whether a value is a plain object (see {@link isObject}) without own enumerable string keys.
 * Objects that have only symbol keys are considered empty.
 *
 * @example
 * ```ts
 * isEmptyObject({}) // true
 * isEmptyObject({ a: 1 }) // false
 * isEmptyObject(new Map()) // false, not a plain object
 * ```
 */
export function isEmptyObject(value: unknown): value is BaseObject<never> {
  return isObject(value) && Object.keys(value).length === 0
}

/**
 * Checks whether a value is a function (including classes and async functions).
 *
 * @example
 * ```ts
 * isFunction(() => 1) // true
 * isFunction(class {}) // true
 * isFunction({}) // false
 * ```
 */
export function isFunction(
  value: unknown,
): value is (...args: Array<never>) => unknown {
  return typeof value === 'function'
}

/**
 * Checks whether a value is a thenable: an object or function with a callable `then` method.
 * Native promises pass this check, and so do thenables from other libraries.
 *
 * @example
 * ```ts
 * isPromise(Promise.resolve(1)) // true
 * isPromise({ then: () => {} }) // true
 * isPromise({}) // false
 * ```
 */
export function isPromise(value: unknown): value is PromiseLike<unknown> {
  return (
    ((typeof value === 'object' && value !== null) ||
      typeof value === 'function') &&
    typeof (value as { then?: unknown }).then === 'function'
  )
}

/**
 * Checks whether a value is a valid `Date`. Dates created from invalid input
 * (`new Date('oops')`) are rejected because their time value is `NaN`.
 *
 * @example
 * ```ts
 * isDate(new Date()) // true
 * isDate(new Date('2026-01-01')) // true
 * isDate(new Date('oops')) // false, Invalid Date
 * ```
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/**
 * Checks whether a key is an own property of an object.
 * Inherited properties (for example, `toString`) are not counted.
 *
 * @example
 * ```ts
 * const user = { id: 1, name: 'Ann' }
 *
 * isKeyOf(user, 'name') // true
 * isKeyOf(user, 'toString') // false
 * ```
 */
export function isKeyOf<T extends object>(
  obj: T,
  key: unknown,
): key is keyof T {
  return (
    (typeof key === 'string' ||
      typeof key === 'number' ||
      typeof key === 'symbol') &&
    Object.hasOwn(obj, key)
  )
}
