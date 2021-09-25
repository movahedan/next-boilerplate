// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfigFile from 'tailwind.config';
import tailwindScreensFile from 'tailwind.screens';

import type { Screens } from 'types/screens';

export const tailwindConfig = resolveConfig(tailwindConfigFile);
export const screensConfig: Screens = tailwindScreensFile;
