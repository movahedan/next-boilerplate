import type { tailwindTheme } from 'ui/utils';

export type ScreenNames = keyof typeof tailwindTheme.theme.screens;

export type MediaQueries = Record<ScreenNames, boolean>;
