/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['import', 'unused-imports'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:tailwindcss/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'unused-imports/no-unused-imports': 'error',
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    /**
     * import
     */
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '^vue*',
            group: 'parent',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'parent',
            position: 'after'
          }
        ],
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        groups: [
          ['index'],
          ['builtin', 'external', 'object'],
          ['internal', 'parent', 'sibling'],
          ['type']
        ],
        'newlines-between': 'always'
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser'
    },
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser'
    }
  ]
}
