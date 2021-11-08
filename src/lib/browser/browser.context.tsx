import { createContext } from 'react';

import { initBrowserContext } from './browser.utils';

import type { BrowserObject } from './browser.d';

export const BrowserContext = createContext<BrowserObject['browser']>(
	initBrowserContext()
);
