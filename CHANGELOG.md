# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-28

First published release.

### Added

Utility types:

- `Nullish` — `null | undefined`.
- `Nullable<T>` — `T | null`.
- `Maybe<T>` — `T | null | undefined`.
- `Optional<T>` — `T | undefined`.
- `BaseObject<Value>` — `Record<PropertyKey, Value>` with `unknown` as the default value type.
- `ValueOf<T>` — union of the property values of `T`.
- `Prettify<T>` — flattens an intersection into a single object type.
- `DeepPartial<T>` — makes every property optional at any depth; arrays, `Map` and `Set` keep their shape, while `Date`, `RegExp`, `Promise`, functions and primitives are left as is.
- `DeepReadonly<T>` — makes every property readonly at any depth; arrays become `ReadonlyArray`, `Map`/`Set` become `ReadonlyMap`/`ReadonlySet`.
- `RequireKeys<T, K>` — makes only the listed keys of `T` required.

Type guards:

- `isNullish(value)` — narrows to `Nullish`.
- `isDefined(value)` — narrows to `NonNullable<T>`; works as an `Array#filter` predicate.
- `isString(value)`, `isNumber(value)`, `isBoolean(value)` — primitive guards; `isNumber` rejects `NaN`, boxed primitives are rejected.
- `isObject(value)` — strict plain-object guard (prototype must be `Object.prototype`).
- `isEmptyObject(value)` — plain object without own enumerable string keys.
- `isFunction(value)` — any function, including classes and async functions.
- `isPromise(value)` — thenable check, not `instanceof Promise`.
- `isDate(value)` — valid `Date`; `Invalid Date` is rejected.
- `isKeyOf(obj, key)` — own property key check that narrows `key` to `keyof typeof obj`.
- `isOneOf(options)` — factory for a guard over a fixed list of values, compared with SameValueZero.

Package infrastructure:

- Dual ESM and CommonJS builds with type declarations for both entry points.
- Tree-shakeable build (`sideEffects: false`), no runtime dependencies, Node.js >= 18.
- CI workflow running typecheck, lint, format and tests on Node.js 20, 22 and 24.
- Release workflow publishing to npm with provenance attestations on `v*` tags.

### Breaking changes

Relative to pre-release drafts of this package, which was never published:

- Renamed `Nil` to `Nullish` and `isNil` to `isNullish`.
- Removed the `isArray`, `isEmptyArray`, `isNonNullable`, `isEmptyString` and `isNonEmptyString` guards, and the `Brand` type.
- `isDefined` now returns `false` for `null` as well as `undefined`, so it is the exact negation of `isNullish`.

[unreleased]: https://github.com/nile-outcast/typescript-extended-types/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/nile-outcast/typescript-extended-types/releases/tag/v0.1.0
