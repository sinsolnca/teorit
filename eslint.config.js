export default [
  { ignores: ['dist', 'node_modules', 'scripts', '*.config.*'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: '18.3' },
    },
    plugins: {
      react: await import('eslint-plugin-react'),
      'react-hooks': await import('eslint-plugin-react-hooks'),
      '@typescript-eslint': await import('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      ...(await import('eslint-plugin-react')).configs.recommended.rules,
      ...(await import('eslint-plugin-react-hooks')).configs.recommended.rules,
      ...(await import('@typescript-eslint/eslint-plugin')).configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]