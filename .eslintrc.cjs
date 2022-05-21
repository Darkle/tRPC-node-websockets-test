module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      modules: true,
      jsx: true,
    },
  },
  env: {
    node: true,
    es2020: true,
  },
  extends: ['eslint:recommended'],

  rules: {},
}
