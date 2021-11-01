import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';

import { AnalyticsHeadScript } from 'lib/analytics';
import { BrowserProvider, extractBrowserServerSideData } from 'lib/browser';
import { getDefaultNextSeoConfig } from 'lib/constants';
import { SampleModel } from 'lib/models/sample';

import { BaseLayout } from 'ui/templates';
import { ComposeProviders, fontLinksProps, globalCSSList } from 'ui/utils';

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
		if (hasError) {
			return (
				<>
					<IndependentProviders />
					<Error />
				</>
			);
		}

		const { Component, pageProps } = this.props;
		const browserData = extractBrowserServerSideData(pageProps);
		const providers = [
			<BrowserProvider key={0} initialData={browserData} />,
			<SampleModel.Provider key={1} />,
		];

		const { Component: Layout = BaseLayout, props: lProps = {} } =
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
		<Head>
			{fontLinksProps.map((props, index) => (
				<link key={index} {...props} />
			))}
		</Head>
		{globalCSSList.map((cssString, index) => (
			<style key={index} jsx global>
				{cssString}
			</style>
		))}
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

	if (IS_WEB_VITALS_ENABLE) console.log(metric);
};

export default MyApp;
