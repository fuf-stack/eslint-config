/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
    },
  },
});
