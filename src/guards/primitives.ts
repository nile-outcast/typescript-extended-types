/**
 * Checks whether a value is a string.
 *
 * @example
 * ```ts
 * isString('hello') // true
 * isString(new String('hello')) // false (boxed primitive)
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Checks whether a value is a number. `NaN` is rejected; `Infinity` and `-Infinity` are accepted.
 *
 * @example
 * ```ts
 * isNumber(42) // true
 * isNumber(Infinity) // true
 * isNumber(NaN) // false
 * isNumber('42') // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * Checks whether a value is a boolean.
 *
 * @example
 * ```ts
 * isBoolean(false) // true
 * isBoolean(0) // false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}
