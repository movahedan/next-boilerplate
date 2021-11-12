import { Global } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';

import { AnalyticsHeadScript } from 'lib/analytics';
import { MediaQueriesProvider } from 'lib/media-queries';
import { SampleModel } from 'models/sample';

import { getDefaultNextSeoConfig } from 'constants/seo';

import {
	ComposeProviders,
	fontLinksProps,
	globalStyles,
	xwindGlobalStyles,
} from 'ui/utils';

import Error from './_error';

import type { AppWithLayoutProps, NextWebVitalsMetric } from 'next/app';

import 'tailwindcss/tailwind.css';

class MyApp extends App<AppWithLayoutProps> {
	state = {
		hasError: false,
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { hasError } = this.state;
		const { Component, pageProps } = this.props;

		if (hasError) {
			return (
				<>
					<IndependentProviders />
					<Error />
				</>
			);
		}

		const providers = [
			<MediaQueriesProvider key={0} initialData={pageProps} />,
			<SampleModel.Provider key={1} />,
		];

		const { Component: Layout = Fragment, props: lProps = {} } =
			Component.Layout || {};
		const layoutProps =
			typeof lProps === 'function' ? lProps(pageProps) : lProps;

		return (
			<>
				<IndependentProviders />
				<ComposeProviders providers={providers}>
					<Layout key={2} {...layoutProps}>
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
