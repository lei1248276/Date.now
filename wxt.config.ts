import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Date.now',
    version: '1.0.1',
    description: 'Display the current time.',
    permissions: ['storage', 'alarms']
  },
  extensionApi: 'chrome',
  outDir: 'dist'
});
