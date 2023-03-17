const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: ['./packages/*/tsconfig.json', './examples/*/tsconfig.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
      },
    ],
  },
  ignorePatterns: ['CHANGELOG.md', 'playgrounds', 'dist', 'node_modules', '**/*.config.cjs'],
});
