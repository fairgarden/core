# FairGarden Core

<!-- fg:version -->

Version **26.09.01-alpha.1**

<!-- /fg:version -->

<!-- fg:modules -->

| Module | Version | Pinned at | Path |
| --- | --- | --- | --- |
| [`@fairgarden/id`](https://github.com/fairgarden/id) | 0.1.0-alpha.0 | [f0f92f5](https://github.com/fairgarden/id/commit/f0f92f50b0588ed75e3b0e0ea5a4ed1fa9897d42) — untagged | `apps/id` |
| [`@fairgarden/members`](https://github.com/fairgarden/members) | 0.1.0-alpha.0 | [0549640](https://github.com/fairgarden/members/commit/0549640006e6193f6fc76d6397113525f9a10d69) — untagged | `apps/members` |
| [`@fairgarden/design`](https://github.com/fairgarden/design)<br>FairGarden Design System | 0.1.0-alpha.2 | [11a4096](https://github.com/fairgarden/design/commit/11a4096f58a4922f91129a0285d839a3cd1a725a) — unreleased, after v0.1.0-alpha.1 | `packages/design` |
| [`@fairgarden/distribution`](https://github.com/fairgarden/distribution)<br>Compose versioned modules into a distribution, and extend one distribution from another | 0.1.0-alpha.7 | [271c5ce](https://github.com/fairgarden/distribution/commit/271c5cedab9fcf8698d8f6d43e3afb75defd154d) — unreleased, after v0.1.0-alpha.6 | `packages/distribution` |
| [`@fairgarden/indicators`](https://github.com/fairgarden/indicators)<br>Put locale, preferences and flags into the path, so every variant of a Next.js page is a static cache key | 0.1.0-alpha.2 | [7fd3982](https://github.com/fairgarden/indicators/commit/7fd398245bc7bdabd7bcbcc0a17dd41ce45a1a47) — unreleased, after v0.1.0-alpha.1 | `packages/indicators` |
| [`@fairgarden/monolith`](https://github.com/fairgarden/monolith)<br>Compose several Next.js apps into a single deployable monolith | 0.1.0-alpha.1 | [dc78a2e](https://github.com/fairgarden/monolith/commit/dc78a2e0812c56b6b87ba27acf925d0251fe42bc) — unreleased, after v0.1.0-alpha.0 | `packages/monolith` |
| [`@fairgarden/policy`](https://github.com/fairgarden/policy)<br>An organization's policy as Open Policy Agent bundles: built in layers from the repository, run in process, disclosed to members, every decision recorded | 0.1.0-alpha.0 | [a7495da](https://github.com/fairgarden/policy/commit/a7495da976c4128c3700a8657a5ed7cc0473a9ff) — untagged | `packages/policy` |

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

It is distributed using calendar versions — the year, the month and which release of that month — with each package being versioned independently using semantic versioning.

For example, the `@fairgarden/core` package may be at version `26.09.01` (the first release of September 2026), while the `@fairgarden/design` package may be at version `1.2.3`. This gives you the best of both worlds, descriptive versioning for each package, but a more user friendly version for end users.

## Monorepo

This is a monorepo for distribution and development purposes only. Each package is published to npm as a separate package and maintained at its' individual repo.

<!-- fg:releasing -->

## Releasing

The version is the month it is released in and which release of the month it
is: `26.09.01` is September 2026's first, and `26.09.01-alpha.0` that release's
first alpha. The version in `package.json` is always the next one, and its
release notes are the top section of `CHANGELOG.md` — the modules bumped since
the last release, linked to their own notes, and any change to policy.

1. **Publish it.** Run the *Publish* workflow from the Actions tab. It refuses a
   version already on npm, or one from a month that is over. Once it is out,
   open pull requests are held — their changelog check fails — so nothing is
   noted under a version that has already shipped.
2. **Start the next version.** `pnpm next-version` moves the version to the next
   alpha, or to the month's first release once the month has turned, and starts
   its section of the changelog. `--id beta` or `--stable` takes the release
   through its stages instead. Commit it on a branch and open a pull request;
   merging it lifts the hold.

A held pull request goes on once it is brought up to date with main and, if it
added a line, that line is moved into the new version's section.

Every push to main publishes `@fairgarden/core@canary`, with the commit each module is
pinned at. A canary is not a release and carries no promise.

<!-- /fg:releasing -->
