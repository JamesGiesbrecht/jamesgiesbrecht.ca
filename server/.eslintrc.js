module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended', 'plugin:security/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier'],
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    semi: 'off',
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
