import type { tailwindTheme } from 'lib/utils';

export type ScreenNames = keyof typeof tailwindTheme.theme.screens;

export type MediaQueries = Record<ScreenNames, boolean>;
