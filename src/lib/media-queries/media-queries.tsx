import { useContext, useEffect, useState } from 'react';

import { getHeaderUserAgent, getIsMobileUserAgent } from 'lib/utils';

import { getMatchMediaEntries } from './media-queries.constants';
import {
	MediaQueriesContext,
	initMediaQueriesContext,
} from './media-queries.context';

import type { ScreenNames, MediaQueries } from './media-queries.d';
import type { IncomingMessage } from 'http';
import type { FC } from 'react';

export const useMediaQueries = () => useContext(MediaQueriesContext);

export function withMediaQueriesServerSideData<Props = unknown>(
	pageResultProps: Props,
	headers: IncomingMessage['headers']
): Props & { mediaQueries: { isMobile: boolean } } {
	return {
		...pageResultProps,
		mediaQueries: {
			isMobile: getIsMobileUserAgent(getHeaderUserAgent(headers)),
		},
	};
}

interface MediaQueriesProviderProps {
	initialData: {
		[k: string]: unknown;
		mediaQueries?: { isMobile: boolean };
	};
}
export const MediaQueriesProvider: FC<MediaQueriesProviderProps> = ({
	initialData,
	children,
}) => {
	const [mediaQueries, setMediaQueries] = useState<MediaQueries>(() =>
		initMediaQueriesContext(!initialData.mediaQueries?.isMobile ? 'lg' : 'sm')
	);

	useEffect(() => {
		const onChange =
			([breakpoint, matchMedia]: [ScreenNames, MediaQueryList | undefined]) =>
			() => {
				setMediaQueries((mediaQueries) => ({
					...mediaQueries,
					[breakpoint]: matchMedia?.matches || false,
				}));
			};

		getMatchMediaEntries().map((matchMediaEntry) => {
			matchMediaEntry[1]?.addEventListener<'change'>(
				'change',
				onChange(matchMediaEntry)
			);
		});

		return () => {
			getMatchMediaEntries().map((matchMediaEntry) => {
				matchMediaEntry[1]?.removeEventListener(
					'change',
					onChange(matchMediaEntry)
				);
			});
		};
	}, []);

	return (
		<MediaQueriesContext.Provider value={mediaQueries}>
			{children}
		</MediaQueriesContext.Provider>
	);
};
