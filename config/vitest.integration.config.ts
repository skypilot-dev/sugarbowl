import { defineConfig, mergeConfig } from 'vitest/config';

import { baseConfig } from './vitest.config.js';

export const integrationTestPatterns = [
  '**/src/**/*.int.test.ts',
];

const config = defineConfig({
  test: {
    include: integrationTestPatterns,
  },
});

export default mergeConfig(baseConfig, config);
