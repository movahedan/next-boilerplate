import type { NextSeoProps } from 'next-seo';

export const authorName = 'Soheil Movahedan';
export const authorDescription =
	'Experienced Front-End developer, Next.js enthusiast and highly skilled in React.js';

const noIndex = process.env.NEXT_PUBLIC_INDEXING_ENABLED ? undefined : true;
export const defaultNextSeoConfig: NextSeoProps = {
	noindex: noIndex,
	nofollow: noIndex,
	disableGooglebot: noIndex,

	titleTemplate: `%s | ${authorName}`, // Replaces %s with your title string
	defaultTitle: authorName,
	description: authorDescription,

	openGraph: {
		type: 'website',
		locale: 'en_IE',
		site_name: authorName,
	},

	additionalMetaTags: [
		{
			name: 'viewport',
			content:
				'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes',
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge',
		},
	],
};
