type Primitive = string | number | boolean | bigint | symbol | null | undefined

/**
 * Values that are treated as atomic by the deep utility types:
 * they are never traversed and are returned as is.
 */
type Atomic =
  | Primitive
  | ((...args: Array<never>) => unknown)
  | Date
  | RegExp
  | Promise<unknown>
  | WeakMap<WeakKey, unknown>
  | WeakSet<WeakKey>

/**
 * Union of all property value types of `T`.
 *
 * @example
 * ```ts
 * const Status = { Idle: 'idle', Busy: 'busy' } as const
 *
 * type StatusValue = ValueOf<typeof Status> // 'idle' | 'busy'
 * ```
 */
export type ValueOf<T> = T[keyof T]

/**
 * Flattens an intersection (or any other composed type) into a single
 * object type, so that it is displayed as a plain object in tooltips
 * and error messages. Does not change assignability.
 *
 * @example
 * ```ts
 * type A = { a: number } & { b: string }
 *
 * type B = Prettify<A> // { a: number; b: string }
 * ```
 */
export type Prettify<T> = { [K in keyof T]: T[K] }

/**
 * Recursive version of `Partial<T>`: makes every property optional at any depth.
 *
 * Arrays and tuples keep their shape (their elements become deeply partial),
 * `Map`/`Set` keep their kind, and atomic values (primitives, functions,
 * `Date`, `RegExp`, `Promise`, `WeakMap`, `WeakSet`) are left untouched.
 *
 * @example
 * ```ts
 * type Config = { server: { host: string; port: number }; tags: Array<string> }
 *
 * type Patch = DeepPartial<Config>
 * // { server?: { host?: string; port?: number }; tags?: Array<string> }
 *
 * const patch: Patch = { server: { port: 8080 } }
 * ```
 */
export type DeepPartial<T> = unknown extends T
  ? T
  : T extends Map<infer K, infer V>
    ? Map<K, DeepPartial<V>>
    : T extends ReadonlyMap<infer K, infer V>
      ? ReadonlyMap<K, DeepPartial<V>>
      : T extends Set<infer U>
        ? Set<DeepPartial<U>>
        : T extends ReadonlySet<infer U>
          ? ReadonlySet<DeepPartial<U>>
          : T extends Atomic
            ? T
            : T extends ReadonlyArray<unknown>
              ? { [K in keyof T]: DeepPartial<T[K]> }
              : { [K in keyof T]?: DeepPartial<T[K]> }

/**
 * Recursive version of `Readonly<T>`: makes every property readonly at any depth.
 *
 * Arrays and tuples become `readonly`, `Map`/`Set` become `ReadonlyMap`/`ReadonlySet`,
 * and atomic values (primitives, functions, `Date`, `RegExp`, `Promise`, `WeakMap`,
 * `WeakSet`) are left untouched.
 *
 * @example
 * ```ts
 * type State = { user: { name: string }; items: Array<number> }
 *
 * type Frozen = DeepReadonly<State>
 * // { readonly user: { readonly name: string }; readonly items: ReadonlyArray<number> }
 * ```
 */
export type DeepReadonly<T> = unknown extends T
  ? T
  : T extends ReadonlyMap<infer K, infer V>
    ? ReadonlyMap<K, DeepReadonly<V>>
    : T extends ReadonlySet<infer U>
      ? ReadonlySet<DeepReadonly<U>>
      : T extends Atomic
        ? T
        : { readonly [K in keyof T]: DeepReadonly<T[K]> }

/**
 * Makes the listed keys of `T` required, leaving the rest untouched.
 *
 * @example
 * ```ts
 * type User = { id: number; name?: string; email?: string }
 *
 * type UserWithName = RequireKeys<User, 'name'>
 * // { id: number; name: string; email?: string }
 * ```
 */
export type RequireKeys<T, K extends keyof T> = Prettify<
  Omit<T, K> & Required<Pick<T, K>>
>
