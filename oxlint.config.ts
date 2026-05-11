import {defineConfig} from 'oxlint'

export default defineConfig({
    plugins: ['typescript', 'node', 'unicorn', 'import', 'promise'],
    rules: {
        'typescript/triple-slash-reference': 'off',
    },
    ignorePatterns: [
        '**/.adonisjs/**',
        'node_modules/**',
        'dist/**',
        'build/**',
        'tmp/**',
        'coverage/**',
    ],
})