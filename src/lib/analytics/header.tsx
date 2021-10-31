import React from 'react';

import type { FC } from 'react';

type AnalyticsHeadScriptProps = {
	url?: string;
};

export const AnalyticsHeadScript: FC<AnalyticsHeadScriptProps> = ({ url }) => {
	if (!url) {
		return null;
	}

	return <script data-testid='analytics-script' src={url} async defer></script>;
};
