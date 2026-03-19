import js from '@eslint/js'
import jest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.js'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['node_modules/**', 'eslint.config.mjs'],
  },
  js.configs.recommended,
  {
    name: 'app/jest',
    files: ['test/**/*.js'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/expect-expect': 'off',
      'jest/valid-title': 'off',
    },
  },
  {
    name: 'app/globals',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
