// See http://eslint.org/docs/
module.exports = {
    env: {es6: true, commonjs: true},
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: {jsx: true}
    },
    extends: ['eslint:recommended', 'plugin:inferno/recommended'],
    plugins: ['prettier', 'inferno'],
    rules: {
        'prettier/prettier': ['error', {
            singleQuote: true, 
            bracketSpacing: false,
            trailingComma: 'es5'
        }],
        'inferno/jsx-uses-inferno': 'error',
        'inferno/jsx-uses-vars': 'error'
    }
}
