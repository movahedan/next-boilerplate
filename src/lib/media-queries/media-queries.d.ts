import type { tailwindConfig } from 'lib/utils';

export type ScreenNames = keyof typeof tailwindConfig.theme.screens;

export type MediaQueries = Record<ScreenNames, boolean>;
