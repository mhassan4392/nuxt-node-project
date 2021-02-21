module.exports = {
  env: {
    browser: false,
    es2020: true,
    node: true
  },
  extends: ['prettier', 'standard'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {}
}
