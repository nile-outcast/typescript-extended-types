/**
 * A value that is `null` or `undefined`.
 *
 * @example
 * ```ts
 * const empty: Nullish = null
 * const alsoEmpty: Nullish = undefined
 * ```
 */
export type Nullish = null | undefined

/**
 * A value that can be `null`.
 *
 * Handy for results of lookups and for fields that are explicitly "not set".
 * Does NOT include `undefined`; use {@link Maybe} for that.
 *
 * @example
 * ```ts
 * type User = { name: string; avatar: Nullable<string> }
 *
 * const user: User = { name: 'Ann', avatar: null }
 * ```
 */
export type Nullable<T> = T | null

/**
 * A value that can be `null` or `undefined`.
 *
 * @example
 * ```ts
 * function greet(name: Maybe<string>): string {
 *   return `Hello, ${name ?? 'stranger'}`
 * }
 *
 * greet(null) // 'Hello, stranger'
 * greet(undefined) // 'Hello, stranger'
 * ```
 */
export type Maybe<T> = T | null | undefined

/**
 * A value that can be `undefined`.
 *
 * Unlike an optional property (`key?: T`), it is always explicit:
 * the key (or the argument) must be passed, even if it is `undefined`.
 *
 * @example
 * ```ts
 * type Options = { timeout: Optional<number> }
 *
 * const a: Options = { timeout: undefined } // OK
 * const b: Options = {} // Error: property 'timeout' is missing
 * ```
 */
export type Optional<T> = T | undefined

/**
 * A "plain object with any keys" marker.
 *
 * Use it for functions and structures that accept arbitrary objects
 * without requiring particular fields. The value type is `unknown` by default.
 *
 * @example
 * ```ts
 * function keysOf(obj: BaseObject): Array<string> {
 *   return Object.keys(obj)
 * }
 *
 * type Counters = BaseObject<number> // Record<PropertyKey, number>
 * ```
 */
export type BaseObject<Value = unknown> = Record<PropertyKey, Value>
