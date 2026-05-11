import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  trailingComma: 'es5',
  semi: false,
  useTabs: false,
  singleQuote: true,
  quoteProps: 'consistent',
  bracketSpacing: true,
  arrowParens: 'always',
  sortPackageJson: false,
  htmlWhitespaceSensitivity: 'ignore',
  ignorePatterns: [
    '**/.adonisjs/**',
    'node_modules/**',
    'dist/**',
    'build/**',
    '*.yml',
    'tmp/**',
    'coverage/**',
  ],
})
