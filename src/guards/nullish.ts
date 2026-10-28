import type { Nullish } from '../types/basic'

/**
 * Checks whether a value is nullish, i.e. `null` or `undefined`.
 * Behaves like the `??` operator: both values count as nullish.
 *
 * @example
 * ```ts
 * const name: string | null = null
 *
 * if (isNullish(name)) {
 *   name // null
 * } else {
 *   name // string
 * }
 * ```
 */
export function isNullish(value: unknown): value is Nullish {
  return value === null || value === undefined
}

/**
 * Checks whether a value is neither `null` nor `undefined`.
 * Narrows the type to `NonNullable<T>`. Useful with `Array#filter`
 * to drop all nullish entries.
 *
 * @example
 * ```ts
 * const values: Array<string | null | undefined> = ['a', null, undefined, 'b']
 *
 * values.filter(isDefined) // Array<string>
 * ```
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
