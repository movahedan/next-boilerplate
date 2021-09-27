import { tailwindTheme } from './tailwind-theme';

export const tailwindConfig = tailwindTheme;

export type Screens = typeof tailwindTheme.theme.screens;
export const screensConfig: Screens = tailwindTheme.theme.screens;
