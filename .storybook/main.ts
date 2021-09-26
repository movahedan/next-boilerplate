import { StorybookConfig } from '@storybook/react/types';
import { resolve } from 'path';
import { version } from '../package.json';

process.env.STORYBOOK_VERSION = version;

const config: StorybookConfig = {
  stories: [
    '../src/ui/**/*.stories.ts?(x)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    './grid/preset',
  ],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      resolve(__dirname, '../src'),
    ];
    return config;
  },
};

export default config;
