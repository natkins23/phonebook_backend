module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: { 'prettier/prettier': 'error', 'linebreak-style': 'unix' },
    plugins: ['prettier'],
}
