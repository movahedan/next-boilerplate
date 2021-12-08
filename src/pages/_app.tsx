import { Global } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import { SWRConfig } from 'swr';

import { AnalyticsHeadScript } from 'lib/analytics';
import { MediaQueriesProvider } from 'lib/media-queries';

import { fetcherConfig, swrConfig } from 'entry/configs';
import { getDefaultNextSeoConfig } from 'entry/seo';

import {
	ComposeProviders,
	fontLinksProps,
	globalStyles,
	xwindGlobalStyles,
} from 'ui/utils';

import Error from './_error';

import type { AppWithLayoutProps, NextWebVitalsMetric } from 'next/app';

import 'tailwindcss/base.css';

class MyApp extends App<AppWithLayoutProps> {
	state = {
		hasError: false,
	};

	constructor(props: AppWithLayoutProps) {
		super(props);

		if (global.window) {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			fetcherConfig(() => {});
		}
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { hasError } = this.state;

		if (hasError) {
			return (
				<>
					<IndependentProviders />
					<Error />
				</>
			);
		}

		const { Component, pageProps } = this.props;
		const { Component: Layout = Fragment, props: lProps = {} } =
			Component.Layout || {};
		const layoutProps =
			typeof lProps === 'function' ? lProps(pageProps) : lProps;

		return (
			<>
				<IndependentProviders />
				<ComposeProviders
					providers={[
						<SWRConfig key={0} value={swrConfig(pageProps)} />,
						<MediaQueriesProvider key={1} initialData={pageProps} />,
					]}
				>
					<Layout {...layoutProps}>
						<Component {...pageProps} />
					</Layout>
				</ComposeProviders>
			</>
		);
	}
}

const IndependentProviders = () => (
	<>
		<Global styles={globalStyles} />
		<Global styles={xwindGlobalStyles} />
		<Head>
			{fontLinksProps.map((props, index) => (
				<link key={index} {...props} />
			))}
		</Head>
		<DefaultSeo
			{...getDefaultNextSeoConfig({
				noIndex: process.env.NEXT_PUBLIC_INDEXING_ENABLED ? false : true,
			})}
		/>
		<AnalyticsHeadScript url={process.env.NEXT_PUBLIC_ANALYTIC_URL} />
	</>
);

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
	const IS_WEB_VITALS_ENABLE = process.env.NEXT_PUBLIC_WEB_VITALS === 'true';

	if (IS_WEB_VITALS_ENABLE) {
		console.log(metric);
	}
};

export default MyApp;
