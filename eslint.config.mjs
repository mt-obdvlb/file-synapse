import js from '@eslint/js'
import json from '@eslint/json'
import pluginNext from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import turboPlugin from 'eslint-plugin-turbo'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  {
    ignores: ['dist/**', 'apps/web/public'],
  },

  {
    plugins: {
      turbo: turboPlugin,
    },
    files: ['apps/**', 'packages/**'],
  },

  {
    plugins: {
      onlyWarn,
    },
  },

  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...pluginNext.configs['strict'],
    },
    files: ['apps/web/**'],
  },

  {
    plugins: {
      'react-hooks': pluginReactHooks,
      react: pluginReact,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    files: ['apps/web/**'],
  },

  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    ...json.configs.recommended,
  },

  {
    name: 'prettier-config',
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'warn',
    },
  },
])
