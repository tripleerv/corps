module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['node', 'babel'],
  rules: {
    "linebreak-style": [ "error", "unix" ],
    "no-console": [ "warn", { "allow": [ "warn", "error", "info" ] } ],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
    "no-undef": 1,
    "camelcase": 1,
    "func-names": [ "error", "never" ],
    "object-curly-spacing": [ "error", "always" ],
  }
}
