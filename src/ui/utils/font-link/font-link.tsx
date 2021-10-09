import Head from 'next/head';

/* eslint-disable @next/next/no-css-tags */
export const FontLinkHead = () => (
	<Head>
		<link rel='preconnect' href='https://css.gstatic.com/' crossOrigin='true' />
		<link rel='preload' as='style' href='/css/font.css' />
		<link rel='stylesheet' href='/css/font.css' />
	</Head>
);
