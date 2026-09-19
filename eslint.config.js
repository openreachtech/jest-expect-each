import configurations from '@openreachtech/eslint-config'

export default [
  /*
   * If ignores is used without any other keys in the configuration object, then the patterns act as global ignores. Here’s an example:
   *
   * https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
   */
  {
    ignores: [
      'lib/setup-expect-each.mjs',
    ],
  },

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
