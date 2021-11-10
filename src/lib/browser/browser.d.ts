import type { tailwindConfig } from 'lib/utils';

export type Screens = typeof tailwindConfig.theme.screens;

export interface BrowserObject {
	browser: {
		mediaQueries: BrowserMediaQueries;
	};
}

type BrowserMediaQueries = {
	[key in keyof Screens]: true | false;
};
