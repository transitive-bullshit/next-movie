module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports')
  ],
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  trailingComma: 'none',
  importOrder: ['<THIRD_PARTY_MODULES>', '^(@/(.*)$)', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true
}
