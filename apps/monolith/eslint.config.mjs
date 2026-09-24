import next from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  { ignores: ['node_modules/**', 'app/**', '.next/**'] },
  ...next,
  ...nextTypescript,
]

export default config
