# extended-ts-types

[![npm version](https://img.shields.io/npm/v/extended-ts-types.svg)](https://www.npmjs.com/package/extended-ts-types)
[![CI](https://github.com/nile-outcast/extended-ts-types/actions/workflows/ci.yml/badge.svg)](https://github.com/nile-outcast/extended-ts-types/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/npm/l/extended-ts-types.svg)](LICENSE)
[![minzip](https://img.shields.io/bundlephobia/minzip/extended-ts-types)](https://bundlephobia.com/package/extended-ts-types)

Extended utility types and type guards for TypeScript. Zero runtime dependencies.

[**📦 Changelog**](CHANGELOG.md)

## Installation

```bash
npm install extended-ts-types
```

Requires Node.js 18 or later. Ships ESM and CommonJS builds with type declarations.

## Usage

```ts
import { isNumber, isString, type Nullable } from 'extended-ts-types'

type User = { name: Nullable<string>; age: unknown }

function formatUser(user: User): string {
  if (isString(user.name) && user.name !== '' && isNumber(user.age)) {
    return `${user.name} (${user.age})`
  }
  return 'unknown'
}
```

## Types

### Basic

| Type                | Equivalent                                          |
| ------------------- | --------------------------------------------------- |
| `Nullish`           | `null \| undefined`                                 |
| `Nullable<T>`       | `T \| null`                                         |
| `Maybe<T>`          | `T \| null \| undefined`                            |
| `Optional<T>`       | `T \| undefined`                                    |
| `BaseObject<Value>` | `Record<PropertyKey, Value>` (`unknown` by default) |

### Utility

- **`ValueOf<T>`**: union of property values. `ValueOf<{ a: 1; b: 'x' }>` is `1 | 'x'`.
- **`Prettify<T>`**: flattens an intersection so tooltips show a single object.
- **`DeepPartial<T>`**: makes every property optional at any depth. Arrays, `Map` and `Set` keep their shape; `Date`, `RegExp`, `Promise`, functions and primitives are left as is.
- **`DeepReadonly<T>`**: makes every property readonly at any depth. Arrays become `ReadonlyArray`, `Map`/`Set` become `ReadonlyMap`/`ReadonlySet`.
- **`RequireKeys<T, K>`**: makes only the keys `K` required.

```ts
import type { DeepPartial, RequireKeys } from 'extended-ts-types'

type Config = { server: { host: string; port: number } }
const patch: DeepPartial<Config> = { server: { port: 8080 } }

type Contact = { id: number; email?: string }
type VerifiedContact = RequireKeys<Contact, 'email'> // email: string
```

## Type guards

### Nullish and definedness

- **`isNullish(value)`**: `value is null | undefined`.
- **`isDefined(value)`**: `value is NonNullable<T>`. Returns `false` for both `null` and `undefined`, so it is the negation of `isNullish`.

```ts
import { isDefined } from 'extended-ts-types'

const names = ['Ann', null, undefined, 'Bob']
const present = names.filter(isDefined) // Array<string>
```

### Primitives

- **`isString(value)`**: `typeof value === 'string'`. Boxed `new String()` is rejected. Empty strings are accepted; check `value !== ''` or `value.length` if you need a non-empty string.
- **`isNumber(value)`**: finite or infinite number, `NaN` is rejected.
- **`isBoolean(value)`**: `typeof value === 'boolean'`.

### Objects, arrays and other

- **`isObject(value)`**: plain object only (see notes below).
- **`isEmptyObject(value)`**: plain object without own enumerable string keys.
- **`isFunction(value)`**: any function, including classes and async functions.
- **`isPromise(value)`**: thenable, i.e. has a callable `then`. Native promises and third-party thenables both pass.
- **`isDate(value)`**: valid `Date`. `Invalid Date` is rejected.
- **`isKeyOf(obj, key)`**: `key` is an own property of `obj`. Inherited keys such as `toString` are not counted.
- **`isOneOf(options)`**: returns a guard for a fixed list of values.

```ts
import { isOneOf } from 'extended-ts-types'

const isStatus = isOneOf(['idle', 'busy'] as const)

function apply(input: string) {
  if (isStatus(input)) {
    input // 'idle' | 'busy'
  }
}
```

`isOneOf` compares with SameValueZero (`NaN` matches `NaN`, `+0` matches `-0`). Pass a `const` array so that the narrowed type is the union of literals.

## Behavior notes

- **`isObject` is strict.** It returns `true` only for objects whose prototype is `Object.prototype`. It returns `false` for `null`, arrays, class instances, `Map`, `Set`, `Date`, and objects created with `Object.create(null)`.
- **`isNumber` rejects `NaN`.** `Infinity` and `-Infinity` are accepted. Use `Number.isFinite` if you need to reject them as well.
- **`isDate` rejects `Invalid Date`.** `new Date('oops')` gives a `Date` object whose time value is `NaN`, so the guard returns `false`.
- **`isPromise` checks for a thenable,** not for `instanceof Promise`. Any object with a callable `then` passes.
- **`isEmptyObject` checks only string keys.** An object that has symbol keys but no string keys is considered empty.

## Development

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run test         # vitest, runtime and type tests
npm run build        # tsup, produces dist/
npm run check:package # publint and attw on the packed package
```

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/nile-outcast/extended-ts-types).

Before opening a pull request:

1. Create a branch from `main`.
2. Add or update tests — runtime tests (`*.test.ts`) and type tests (`*.test-d.ts`) both run under `npm test`.
3. Run the full check suite: `npm run typecheck && npm run lint && npm run format:check && npm test`.
4. Describe what changed in [CHANGELOG.md](CHANGELOG.md) under an `Unreleased` section.

Releases are cut by pushing a `v*` tag, which publishes the package to npm with provenance from GitHub Actions.

## License

MIT
