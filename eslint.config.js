import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr', 'public', 'stats.html']),

  // Browser code
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      // Without this, `<motion.div>` does not count as a use of `motion` and
      // no-unused-vars reports every animated component as dead.
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Marks identifiers used only inside JSX (`<motion.div>`) as used.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    },
  },

  // Node-side tooling
  {
    files: ['scripts/**/*.js', '*.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      // Destructuring a few keys out in order to drop them from the rest is the
      // clearest way to omit fields; the named bindings are meant to be unused.
      'no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    },
  },
])
