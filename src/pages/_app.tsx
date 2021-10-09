import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';

import { AnalyticsProvider } from 'lib/analytics';
import { BrowserProvider, extractBrowserServerSideData } from 'lib/browser';
import { defaultNextSeoConfig } from 'lib/constants';

import { BaseLayout, FontLink, GlobalCSS } from 'ui';

import Error from './_error';

import type { AppWithLayoutProps, NextWebVitalsMetric } from 'next/app';
import 'tailwindcss/tailwind.css';

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

const DefaultHead = () => (
	<Head>
		<meta charSet='utf-8' />

		<DefaultSeo {...defaultNextSeoConfig} />
		<FontLink />
	</Head>
);

const IS_WEB_VITALS_ENABLE = process.env.NEXT_PUBLIC_WEB_VITALS === 'true';
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
	if (IS_WEB_VITALS_ENABLE) console.log(metric);
};

export default MyApp;
