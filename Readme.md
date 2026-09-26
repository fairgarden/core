# FairGarden Core

<!-- fg:modules -->

| Module | Version | Pinned at | Path |
| --- | --- | --- | --- |
| [`@fairgarden/id`](https://github.com/fairgarden/id) | 0.1.0-alpha.0 | [b12276c](https://github.com/fairgarden/id/commit/b12276c072c405673828843f3b2d440514b72713) — untagged | `apps/id` |
| [`@fairgarden/members`](https://github.com/fairgarden/members) | 0.1.0-alpha.0 | [5d30b4a](https://github.com/fairgarden/members/commit/5d30b4a5be421f1274ae301b9998e5dd309f861c) — untagged | `apps/members` |
| [`@fairgarden/design`](https://github.com/fairgarden/design)<br>FairGarden Design System | 0.1.0-alpha.2 | [55add59](https://github.com/fairgarden/design/commit/55add59c38d709cde9d3d57fb3ae202da1bd550a) — unreleased, after v0.1.0-alpha.1 | `packages/design` |
| [`@fairgarden/distribution`](https://github.com/fairgarden/distribution)<br>Compose versioned modules into a distribution, and extend one distribution from another | 0.1.0-alpha.0 | [6ada574](https://github.com/fairgarden/distribution/commit/6ada5748d82646dbb693481c4eef37295cff7fc0) — unreleased, after v0.1.0-alpha.0 | `packages/distribution` |
| [`@fairgarden/indicators`](https://github.com/fairgarden/indicators)<br>Put locale, preferences and flags into the path, so every variant of a Next.js page is a static cache key | 0.1.0-alpha.2 | [694d5a6](https://github.com/fairgarden/indicators/commit/694d5a696fa53b220c41a445105ff85747ef22b5) — unreleased, after v0.1.0-alpha.1 | `packages/indicators` |
| [`@fairgarden/monolith`](https://github.com/fairgarden/monolith)<br>Compose several Next.js apps into a single deployable monolith | 0.1.0-alpha.0 | [449f39d](https://github.com/fairgarden/monolith/commit/449f39dccb9747d6fa798e38ae1a693fc0a9aa19) — unreleased, after v0.1.0-alpha.0 | `packages/monolith` |
| [`@fairgarden/policy`](https://github.com/fairgarden/policy)<br>An organization's policy as Open Policy Agent bundles: built in layers from the repository, run in process, disclosed to members, every decision recorded | 0.1.0-alpha.0 | [1bd8be2](https://github.com/fairgarden/policy/commit/1bd8be258ca0014d4ce18d9287e37b2a35fabfc6) — untagged | `packages/policy` |

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

### Running and Building

Every app is served from one Next.js app, the monolith in `apps/monolith`, at
<http://localhost:3000>: id at `/id`, members at `/members`.

```bash
pnpm dev     # the monolith in dev mode
pnpm build   # the monolith, as it is deployed
```

Or each app on its own, as a deployment without the monolith runs them: id at
<http://localhost:3010> and members at <http://localhost:3020>.

```bash
pnpm modular:dev
pnpm modular:build
```

Each app's `.env.development` points it at the others on their own ports;
`apps/monolith/.env.development` says the same for one origin. Both share the
apps' embedded databases, so switching between them keeps your accounts.

Neither builds the documentation sites. They have commands of their own, each
site on its own port (3030–3036):

```bash
pnpm docs:dev
pnpm docs:build
```

The monolith compiles each app from its source, so `pnpm build` builds the
libraries every app uses but none of the apps on their own. turbo tracks that
with a `build:libs` task: a library's is its build, and an app's is only its
libraries' (see `turbo.json`). A new app mounted in the monolith needs its own
`<package>#build:libs` entry like the others.

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
