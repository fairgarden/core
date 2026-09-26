# Fair Garden Monolith

Combines all the applications into a single monolithic Next.js application:
id at `/id` and members at `/members`, on <http://localhost:3000>. Run it from
the repository root with `pnpm dev`, and build it with `pnpm build`.

`.env.development` enrols members with id and points each at the other on
this one origin, the way each app's own `.env.development` does on its own
port for `pnpm modular:dev`.

## Dependencies

Besides the apps themselves, `package.json` lists what the apps load at run
time rather than through the bundle, because that resolves from here:

- `oidc-provider`, which id keeps out of the bundle (`serverExternalPackages`
  in `next.config.ts`).
- `@electric-sql/pglite` and `@electric-sql/pglite-socket`, which id and
  members import at run time for the embedded development database.
