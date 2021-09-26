import { createContext } from 'react';

import { mediaQueryInitializer } from './browser.utils';

import type { BrowserObject } from './browser.types';

export const BrowserContext = createContext<BrowserObject['browser']>({
	mediaQuery: mediaQueryInitializer(),
});
