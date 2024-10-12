import baseConfig from '@williamthorsen/eslint-config-typescript';

const config = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'unicorn/no-instanceof-array': 'off',
    },
  }
];

export default config;
