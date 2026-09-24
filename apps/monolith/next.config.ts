import { withMonolith } from '@fairgarden/monolith'

export default withMonolith(
  {
    // Carried for the id app, whose OIDC provider must not be bundled.
    serverExternalPackages: ['oidc-provider'],
  },
  {
    id: '@fairgarden-private/id',
  }
)
