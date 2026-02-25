import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    config.plugins = [tailwindcss(), ...(config.plugins || [])];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, '../src'),
      },
    };
    config.server = {
      ...config.server,
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.PORT || 5173}`,
          changeOrigin: true,
        },
      },
    };
    if (process.env.NODE_ENV === 'production') config.base = '/storybook/';
    return config;
  },
};

export default config;
