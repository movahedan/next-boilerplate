import { useContext, useEffect, useState } from 'react';

import { BrowserContext } from './browser.context';
import {
	initBrowserContext,
	getMatchMediaEntries,
	getMatchMediasFromUserAgent,
} from './browser.utils';

import type { Screens, BrowserObject } from './browser.d';
import type { IncomingMessage } from 'http';
import type { FC } from 'react';

export const useBrowser = () => useContext(BrowserContext);

export function withBrowserServerSideData<Props = unknown>(
	pageResultProps: Props,
	headers: IncomingMessage['headers']
): Props & BrowserObject {
	return {
		...pageResultProps,
		browser: {
			mediaQueries: getMatchMediasFromUserAgent(headers),
		},
	};
}

export const BrowserProvider: FC<BrowserProviderProps> = ({
	initialData,
	children,
}) => {
	const [mediaQueries, setMediaQueries] = useState<
		BrowserObject['browser']['mediaQueries']
	>(
		initialData.browser?.mediaQueries ||
			(() => initBrowserContext().mediaQueries)
	);

	useEffect(() => {
		const matchMediaEntries = getMatchMediaEntries();
		const onChange =
			([breakpoint, matchMedia]: [keyof Screens, MediaQueryList | undefined]) =>
			() => {
				setMediaQueries((mediaQueries) => ({
					...mediaQueries,
					[breakpoint]: matchMedia?.matches || false,
				}));
			};

		matchMediaEntries.map((matchMediaEntry) => {
			matchMediaEntry[1]?.addEventListener<'change'>(
				'change',
				onChange(matchMediaEntry)
			);
		});

		return () => {
			matchMediaEntries.map((matchMediaEntry) => {
				matchMediaEntry[1]?.removeEventListener(
					'change',
					onChange(matchMediaEntry)
				);
			});
		};
	}, []);

	return (
		<BrowserContext.Provider value={{ mediaQueries }}>
			{children}
		</BrowserContext.Provider>
	);
};

interface BrowserProviderProps {
	initialData: {
		[k: string]: unknown;
		browser?:
			| { mediaQueries: BrowserObject['browser']['mediaQueries'] }
			| undefined;
	};
}
