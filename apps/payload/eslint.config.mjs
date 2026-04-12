import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { globalIgnores } from 'eslint/config'
import sharedConfig from '@shared/eslint-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...sharedConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      'no-restricted-syntax': [
        'warn',
        {
          selector: "CallExpression[callee.name='useMemo']",
          message: 'useMemo not needed with React Compiler',
        },
        {
          selector: "CallExpression[callee.name='useCallback']",
          message: 'useCallback not needed with React Compiler',
        },
      ],
    },
  },
  {
    ignores: ['.next/'],
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    'src/migrations/**',
    '.claude/**',
  ]),

]

export default eslintConfig
