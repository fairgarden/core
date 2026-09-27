# FairGarden Core

<!-- fg:version -->

Version **26.09.01-alpha.1**

<!-- /fg:version -->

<!-- fg:modules -->

| Module | Version | Pinned at | Path |
| --- | --- | --- | --- |
| [`@fairgarden/id`](https://github.com/fairgarden/id) | 0.1.0-alpha.0 | [4bcdf89](https://github.com/fairgarden/id/commit/4bcdf89500fdf4b57ff4c3413a0e99d1be0b9bb1) — untagged | `apps/id` |
| [`@fairgarden/members`](https://github.com/fairgarden/members) | 0.1.0-alpha.0 | [89e3630](https://github.com/fairgarden/members/commit/89e3630f93acee2da571e95304afb525e1f1fdf6) — untagged | `apps/members` |
| [`@fairgarden/design`](https://github.com/fairgarden/design)<br>FairGarden Design System | 0.1.0-alpha.2 | [c98f1c8](https://github.com/fairgarden/design/commit/c98f1c85ffbf3a188bf0d384ea135d0995349f85) — unreleased, after v0.1.0-alpha.1 | `packages/design` |
| [`@fairgarden/distribution`](https://github.com/fairgarden/distribution)<br>Compose versioned modules into a distribution, and extend one distribution from another | 0.1.0-alpha.5 | [85adbf5](https://github.com/fairgarden/distribution/commit/85adbf51bfc9f938ab2b3d954b620c8bc746fdf9) — unreleased, after v0.1.0-alpha.4 | `packages/distribution` |
| [`@fairgarden/indicators`](https://github.com/fairgarden/indicators)<br>Put locale, preferences and flags into the path, so every variant of a Next.js page is a static cache key | 0.1.0-alpha.2 | [c71816e](https://github.com/fairgarden/indicators/commit/c71816ede27c5d1388ca161b56c7362413d9989c) — unreleased, after v0.1.0-alpha.1 | `packages/indicators` |
| [`@fairgarden/monolith`](https://github.com/fairgarden/monolith)<br>Compose several Next.js apps into a single deployable monolith | 0.1.0-alpha.0 | [7d4c3fe](https://github.com/fairgarden/monolith/commit/7d4c3fe7f0a939adf7634e0e2b86762258488e04) — unreleased, after v0.1.0-alpha.0 | `packages/monolith` |
| [`@fairgarden/policy`](https://github.com/fairgarden/policy)<br>An organization's policy as Open Policy Agent bundles: built in layers from the repository, run in process, disclosed to members, every decision recorded | 0.1.0-alpha.0 | [9695f3b](https://github.com/fairgarden/policy/commit/9695f3b058fef8ac2bc4ca1bd838c6cb3c348469) — untagged | `packages/policy` |

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
