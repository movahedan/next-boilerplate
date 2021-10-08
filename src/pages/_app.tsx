/* eslint-disable @next/next/no-css-tags */
import App from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';

import { AnalyticsProvider } from 'lib/analytics';
import { BrowserProvider, extractBrowserServerSideData } from 'lib/browser';

import { BaseLayout, GlobalCSS } from 'ui';
import 'tailwindcss/tailwind.css';

import Error from './_error';

import type { AppWithLayoutProps, NextWebVitalsMetric } from 'next/app';

class MyApp extends App<AppWithLayoutProps> {
	state = {
		hasError: false,
		queryClient: new QueryClient(),
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { queryClient, hasError } = this.state;
		const { Component, pageProps } = this.props;
		const browserData = extractBrowserServerSideData(pageProps);

		if (hasError) {
			return (
				<>
					<Error />
					<DefaultHead />
					<GlobalCSS />
				</>
			);
		}

		const Layout = Component.Layout?.Component || BaseLayout;
		const layoutProps =
			typeof Component.Layout?.props === 'function'
				? Component.Layout?.props(pageProps)
				: Component.Layout?.props || {};

		return (
			<>
				<DefaultHead />
				<GlobalCSS />

				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<BrowserProvider initialData={browserData}>
							<Layout {...layoutProps}>
								<Component {...pageProps} />
							</Layout>
						</BrowserProvider>

						<AnalyticsProvider />
					</Hydrate>

					<ReactQueryDevtools />
				</QueryClientProvider>
			</>
		);
	}
}

const IS_WEB_VITALS_ENABLE = process.env.NEXT_PUBLIC_WEB_VITALS === '1';
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
	if (IS_WEB_VITALS_ENABLE) console.log(metric);
};

const FontHead = () => (
	<>
		<link rel='preconnect' href='https://css.gstatic.com/' crossOrigin='true' />
		<link rel='preload' as='style' href='/css/font.css' />
		<link rel='stylesheet' href='/css/font.css' />
	</>
);

const DefaultHead = () => (
	<Head>
		<meta charSet='utf-8' />
		<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
		<meta
			name='viewport'
			content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes'
		/>
		<title>Next.js</title>

		<FontHead />
	</Head>
);

export default MyApp;
