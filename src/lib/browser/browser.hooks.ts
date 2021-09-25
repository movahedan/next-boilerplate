import { useEffect, useState } from 'react';

import { matchMediaEntries } from './browser.constants';
import { mediaQueryInitializer } from './browser.utils';

import type { BrowserMediaQuery } from './browser.context';
import type { Screens } from 'types/screens';

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

	return mediaQueries;
};
