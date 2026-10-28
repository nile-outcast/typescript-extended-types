import { expectTypeOf, test } from 'vitest'
import type {
  BaseObject,
  DeepPartial,
  DeepReadonly,
  Maybe,
  Nullable,
  Nullish,
  Optional,
  Prettify,
  RequireKeys,
  ValueOf,
} from '../index'

test('basic types', () => {
  expectTypeOf<Nullish>().toEqualTypeOf<null | undefined>()
  expectTypeOf<Nullable<string>>().toEqualTypeOf<string | null>()
  expectTypeOf<Maybe<string>>().toEqualTypeOf<string | null | undefined>()
  expectTypeOf<Optional<string>>().toEqualTypeOf<string | undefined>()
  expectTypeOf<BaseObject>().toEqualTypeOf<Record<PropertyKey, unknown>>()
  expectTypeOf<BaseObject<number>>().toEqualTypeOf<
    Record<PropertyKey, number>
  >()
})

test('ValueOf returns the union of property values', () => {
  const Status = { Idle: 'idle', Busy: 'busy' } as const

  expectTypeOf<ValueOf<typeof Status>>().toEqualTypeOf<'idle' | 'busy'>()
})

test('Prettify flattens an intersection', () => {
  type Merged = { a: number } & { b: string }

  expectTypeOf<Prettify<Merged>>().toEqualTypeOf<{ a: number; b: string }>()
})

test('DeepPartial makes properties optional at any depth', () => {
  type Config = {
    server: { host: string; port: number }
    tags: Array<string>
  }

  expectTypeOf<DeepPartial<Config>>().toEqualTypeOf<{
    server?: { host?: string; port?: number }
    tags?: Array<string>
  }>()
})

test('DeepPartial keeps Map values deeply partial', () => {
  expectTypeOf<DeepPartial<Map<string, { a: number }>>>().toEqualTypeOf<
    Map<string, { a?: number }>
  >()
})

test('DeepPartial leaves atomic values untouched', () => {
  expectTypeOf<DeepPartial<Date>>().toEqualTypeOf<Date>()
  expectTypeOf<DeepPartial<Promise<number>>>().toEqualTypeOf<Promise<number>>()
  expectTypeOf<DeepPartial<() => void>>().toEqualTypeOf<() => void>()
  expectTypeOf<DeepPartial<unknown>>().toEqualTypeOf<unknown>()
})

test('DeepReadonly makes properties readonly at any depth', () => {
  type State = {
    user: { name: string }
    items: Array<number>
  }

  expectTypeOf<DeepReadonly<State>>().toEqualTypeOf<{
    readonly user: { readonly name: string }
    readonly items: ReadonlyArray<number>
  }>()
})

test('DeepReadonly turns Set into ReadonlySet with readonly values', () => {
  expectTypeOf<DeepReadonly<Set<{ a: number }>>>().toEqualTypeOf<
    ReadonlySet<{ readonly a: number }>
  >()
})

test('DeepReadonly leaves atomic values untouched', () => {
  expectTypeOf<DeepReadonly<Date>>().toEqualTypeOf<Date>()
  expectTypeOf<DeepReadonly<RegExp>>().toEqualTypeOf<RegExp>()
  expectTypeOf<DeepReadonly<unknown>>().toEqualTypeOf<unknown>()
})

test('RequireKeys makes only the listed keys required', () => {
  type User = { id: number; name?: string; email?: string }

  expectTypeOf<RequireKeys<User, 'name'>>().toEqualTypeOf<{
    id: number
    name: string
    email?: string
  }>()
})
