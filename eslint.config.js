import configurations from '@openreachtech/eslint-config'

export default [
  ...configurations,

  {
    languageOptions: {
      sourceType: 'module',
    },
  },

  {
    rules: {
      'no-param-reassign': 'off',
    },
  },
]
