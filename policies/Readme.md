# Policies

FairGarden's rules for the services this distribution ships: who may join,
what each service may ask for, what is shared and with whom. Anyone they
apply to can read them in full on the id service's `/policy` page.

## How they are built

Each service brings its own rules, in its own `policies/`:

- `apps/id/policies` — who may see and change an account; what a service may be offered
- `apps/members/policies` — who may join; what services learn about a membership

Those rules ask the questions and leave places for ours. Ours go here, in the
same Rego packages, adding to those places — so upgrading a service brings
its changes and keeps ours. Each service's `policies/` lists its places at the
top, and its `examples/` has an organization's rules to start from.

There are none here yet, so the services' own rules decide, the same as their
built-in rules.

## Changing them

By pull request, like anything else in this repository. Say in it what
changes for members, and why: that is what reviewers weigh. What is merged is
what the next deployment runs.

```bash
pnpm turbo run test --filter=./policies    # each service's tests, then ours on top
pnpm turbo run build --filter=./policies   # what the services will run, described
```

Building and testing fetch the opa CLI when it is not installed.

## Releases

Every build is named by the distribution's version and a digest of every rule
and setting, and every decision a service makes is labelled with it. The
services keep each revision they run, so any decision can be read beside the
rules that made it, at `/policy?revision=…`.

`.manifest` says whose rules these are; its `metadata` is shown with them.
