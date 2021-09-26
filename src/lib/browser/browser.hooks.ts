import { useEffect, useState } from 'react';

import { getMatchMediaEntries, mediaQueryInitializer } from './browser.utils';

import type { BrowserMediaQuery } from './browser.types';
import type { Screens } from 'lib/utils';

export const useMediaQueryProvider = (
	initialMediaQuery?: BrowserMediaQuery
) => {
	const [mediaQueries, setMediaQueries] = useState<BrowserMediaQuery>(
		initialMediaQuery || mediaQueryInitializer
	);

	const onChange =
		([breakpoint, matchMedia]: [keyof Screens, MediaQueryList | undefined]) =>
		() => {
			setMediaQueries((mediaQueries) => ({
				...mediaQueries,
				[breakpoint]: matchMedia?.matches,
			}));
		};

	useEffect(() => {
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

	return mediaQueries;
};
