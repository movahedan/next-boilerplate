import Script from 'next/script';
import React from 'react';

import type { FC } from 'react';

type AnalyticsHeadScriptProps = {
	url?: string;
};

export const AnalyticsHeadScript: FC<AnalyticsHeadScriptProps> = ({ url }) => {
	if (!url) {
		return null;
	}

	return (
		<Script
			defer
			async
			src={url}
			id='analytics-script'
			data-testid='analytics-script'
			strategy='afterInteractive'
		/>
	);
};
