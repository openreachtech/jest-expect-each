import configurations from '@openreachtech/eslint-config'

export default [
  ...configurations,

  {
    rules: {
      'no-param-reassign': 'off',
    },
  },
]
