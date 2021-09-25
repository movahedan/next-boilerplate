import { createContext } from 'react';

import { mediaQueryInitializer } from './browser.utils';

import type { Screens } from 'types/screens';

export type BrowserMediaQuery = {
	[key in keyof Screens]: true | false;
};

export interface BrowserObject {
	browser: {
		mediaQuery: BrowserMediaQuery;
	};
}

export const BrowserContext = createContext<BrowserObject['browser']>({
	mediaQuery: mediaQueryInitializer(),
});
