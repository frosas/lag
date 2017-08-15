module.exports = {
  env: {browser: true},
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {jsx: true}
  },
  extends: ['plugin:inferno/recommended'],
  plugins: ['inferno'],
  rules: {
    'inferno/jsx-uses-inferno': 'error',
    'inferno/jsx-uses-vars': 'error'
  }
};
