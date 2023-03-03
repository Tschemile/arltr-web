/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require('@next/env');

const { defineConfig } = require('cypress');

const { combinedEnv } = loadEnvConfig(process.cwd());

module.exports = defineConfig({
  env: combinedEnv,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
