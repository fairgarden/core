# FairGarden Core

<!-- fg:modules -->

| Module | Version | Pinned at | Path |
| --- | --- | --- | --- |
| [`@fairgarden-private/id`](https://github.com/fairgarden/id) | 0.1.0-alpha.0 | [4c895ee](https://github.com/fairgarden/id/commit/4c895eef92dc6810318142de8676d82c0e497d13) — untagged | `apps/id` |
| [`@fairgarden-private/members`](https://github.com/fairgarden/members) | 0.1.0-alpha.0 | [f9e1aa1](https://github.com/fairgarden/members/commit/f9e1aa150a6a0091163fdec3c7033c77f9297180) — untagged | `apps/members` |
| [`@fairgarden-private/design`](https://github.com/fairgarden/design)<br>Fair Garden Design System | 0.1.0-alpha.0 | [49d4e4c](https://github.com/fairgarden/design/commit/49d4e4c35b071d52ba00ea144775be7944389948) — untagged | `packages/design` |
| [`@fairgarden/distribution`](https://github.com/fairgarden/distribution)<br>Compose versioned modules into a distribution, and extend one distribution from another | 0.1.0-alpha.1 | [544bf4a](https://github.com/fairgarden/distribution/commit/544bf4a4baa25fbc7c29f32c547f60eeffffeb28) — unreleased, after v0.1.0-alpha.0 | `packages/distribution` |
| [`@fairgarden/monolith`](https://github.com/fairgarden/monolith)<br>Compose several Next.js apps into a single deployable monolith | 0.1.0-alpha.1 | [3c0d1d8](https://github.com/fairgarden/monolith/commit/3c0d1d8bc60a7317d836103f2055bbfb75f16dca) — unreleased, after v0.1.0-alpha.0 | `packages/monolith` |

A module pinned at a commit rather than a tag is being shipped ahead of
its last release, so its stated version is not what is deployed.

<!-- /fg:modules -->

This monorepo contains all the necessary packages to run the core of `FairGarden`.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [pnpm](https://pnpm.io/) - Package manager
- [TurboRepo](https://turborepo.dev/) - Monorepo manager (installed by pnpm)

## Development

You should be able to develop on any machine with Node.js and `pnpm` installed (see [Dependencies](#dependencies)).

### Installing Dependencies

```bash
pnpm install
```

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Linting

```bash
pnpm lint
```

## Versioning

It is distributed using date based releases, with each package being versioned independently using semantic versioning.

For example, the `@fairgarden/core` package may be at version `24.01.01` (First Jan 2024 release), while the `@fairgarden/design` package may be at version `1.2.3`. This gives you the best of both worlds, descriptive versioning for each package, but a more user friendly version for end users.

## Monorepo

This is a monorepo for distribution and development purposes only. Each package is published to npm as a separate package and maintained at its' individual repo.
