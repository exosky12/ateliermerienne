import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'node', 'unicorn', 'import', 'promise'],
  rules: {
    'typescript/triple-slash-reference': 'off',
  },
  ignorePatterns: [
    '**/.adonisjs/**',
    'apps/backend/.adonisjs/**',
    '.agent/**',
    '.agents/**',
    '**/.agent/**',
    '**/.agents/**',
    '**/*.md',
    'apps/backend/**/*.d.ts',
    'apps/backend/**/*.js',
    'apps/backend/**/*.js.map',
    'node_modules/**',
    'dist/**',
    'build/**',
    'tmp/**',
    'coverage/**',
  ],
})
