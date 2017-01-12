// See http://eslint.org/docs/
module.exports = {
    env: {es6: true, commonjs: true},
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {jsx: true}
    },
    extends: 'airbnb-base',
    plugins: ['react'],
    rules: {
        'react/jsx-uses-vars': 'error',
        'no-underscore-dangle': 'off',
        'no-new': 'off',
        'comma-dangle': ['error', {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
      }],
    }
}
