import { tailwindTheme } from './tailwind-theme';

export const tailwindConfig = tailwindTheme;

export type Screens = typeof tailwindConfig.theme.screens;
export const screensConfig: Screens = tailwindConfig.theme.screens;
