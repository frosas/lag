// See http://eslint.org/docs/
module.exports = {
    env: {es6: true, commonjs: true},
    parserOptions: {ecmaFeatures: {jsx: true}},
    extends: 'airbnb-base',
    plugins: ['react'],
    rules: {
        'react/jsx-uses-vars': 'error',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'no-new': 'off',
    }
}
