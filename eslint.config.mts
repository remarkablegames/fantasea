import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      eslint,
      prettier,
    },

    extends: ['eslint/recommended'],

    languageOptions: {},

    rules: {
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  tseslint.configs.recommended,
])
