// See http://eslint.org/docs/
module.exports = {
    env: {es6: true, commonjs: true},
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {jsx: true}
    },
    extends: ['eslint:recommended', 'google'],
    plugins: ['react'],
    rules: {
        'max-len': ['error', 100],
        'require-jsdoc': 'off',
        'react/jsx-uses-vars': 'error',
        'no-invalid-this': 'off', // It's buggy
        'arrow-parens': ['error', 'as-needed']
    }
}
