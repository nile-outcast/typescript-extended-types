declare const stringFromBrand: unique symbol

/**
 * A string produced by {@link toJsonString} from a value of type `T`.
 *
 * The type is nominal: a plain `string` is not assignable to it, so values
 * are meant to be created with {@link toJsonString} instead of being written
 * by hand. A branded value is still assignable to `string`, so any string
 * based API accepts it.
 *
 * `null` and `undefined` are rejected by the constraint: `undefined` is not
 * serializable at all, and branding `null` would carry no structure.
 *
 * @example
 * ```ts
 * type Config = { host: string; port: number }
 *
 * const json: StringFrom<Config> = toJsonString({ host: 'localhost', port: 8080 })
 *
 * const asString: string = json // OK, the brand is a subtype of string
 *
 * // @ts-expect-error a plain string is not branded
 * const raw: StringFrom<Config> = '{"host":"localhost"}'
 * ```
 */
export type StringFrom<T extends NonNullable<unknown>> = string & {
  readonly [stringFromBrand]: T
}

/**
 * Serializes `value` with `JSON.stringify` and brands the result as
 * {@link StringFrom} of `T`.
 *
 * Throws a `TypeError` for values `JSON.stringify` turns into `undefined`
 * (`undefined`, functions and symbols). Values JSON cannot represent at all,
 * such as `bigint` or cyclic structures, throw their own `TypeError`.
 *
 * @example
 * ```ts
 * const json = toJsonString({ host: 'localhost', port: 8080 })
 * // StringFrom<{ host: string; port: number }>
 * ```
 */
export function toJsonString<T extends NonNullable<unknown>>(
  value: T,
): StringFrom<T> {
  const json = JSON.stringify(value)

  if (json === undefined) {
    throw new TypeError('Value cannot be serialized to JSON')
  }

  return json as StringFrom<T>
}
