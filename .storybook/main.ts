import { StorybookConfig } from '@storybook/react/types';

import { version } from '../package.json';

process.env.STORYBOOK_VERSION = version;

const config: StorybookConfig = {
  stories: [
    '../src/ui/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
    '@storybook/addon-essentials',
  ],
  features: {
    postcss: true,
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript'
  },
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
};

export default config;
