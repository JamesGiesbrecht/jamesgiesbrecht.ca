export default {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'typescript',
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // 'node/no-missing-import': [
    //   'error',
    //   {
    //     allowModules: [],
    //     resolvePaths: ['/src'],
    //     tryExtensions: ['.js', '.ts', '.json', '.node'],
    //   },
    // ],
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
    semi: ['error', 'never'],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        semi: false,
      },
    ],
  },
}
