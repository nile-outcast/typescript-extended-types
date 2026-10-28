/**
 * Creates a guard that checks whether a value is one of the given options.
 * Comparison uses SameValueZero (`NaN` matches `NaN`, `+0` matches `-0`).
 *
 * Pass a `const` array so the narrowed type is the union of the literal values.
 *
 * @example
 * ```ts
 * const isStatus = isOneOf(['idle', 'busy'] as const)
 *
 * isStatus('busy') // true
 * isStatus('done') // false
 *
 * const value: string = 'idle'
 * if (isStatus(value)) {
 *   value // 'idle' | 'busy'
 * }
 * ```
 */
export function isOneOf<const T extends ReadonlyArray<unknown>>(
  options: T,
): (value: unknown) => value is T[number] {
  return (value: unknown): value is T[number] => options.includes(value)
}
