import { useContext } from 'react';

import { BrowserContext } from './browser.context';
import { useMediaQueryProvider } from './browser.hooks';
import { getMatchMediasFromUserAgent } from './browser.utils';

import type { BrowserObject } from './browser.d';
import type { IncomingMessage } from 'http';
import type { FC } from 'react';

export const useBrowser = () => useContext(BrowserContext);
export const useMediaQuery = () => useContext(BrowserContext).mediaQuery;
export const BrowserProvider: FC<{ initialData?: BrowserObject['browser'] }> =
	({ initialData, children }) => {
		const mediaQuery = useMediaQueryProvider(initialData?.mediaQuery);

		return (
			<BrowserContext.Provider value={{ mediaQuery }}>
				{children}
			</BrowserContext.Provider>
		);
	};

export const extractBrowserServerSideData = (props: {
	[k: string]: unknown;
	browser?: BrowserObject['browser'];
}) => props.browser;
export const attachBrowserServerSideData = (
	headers: IncomingMessage['headers']
): BrowserObject => ({
	browser: {
		mediaQuery: getMatchMediasFromUserAgent(headers),
	},
});
