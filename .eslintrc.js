// See http://eslint.org/docs/
module.exports = {
    env: {es6: true, commonjs: true},
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: {jsx: true}
    },
    extends: ['eslint:recommended'],
    plugins: ['prettier', 'react'],
    rules: {
        'prettier/prettier': ['error', {
            singleQuote: true, 
            bracketSpacing: false,
            trailingComma: 'es5'
        }],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error'
    }
}
