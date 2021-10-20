import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';

import { AnalyticsProvider } from 'lib/analytics';
import { BrowserProvider, extractBrowserServerSideData } from 'lib/browser';
import { defaultNextSeoConfig } from 'lib/constants';
import { SampleModel } from 'lib/models/sample';

import {
	BaseLayout,
	ComposeProviders,
	fontLinksProps,
	globalCSSList,
} from 'ui';

import Error from './_error';

import type { AppWithLayoutProps, NextWebVitalsMetric } from 'next/app';
import type { FC } from 'react';

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
					{independentProviders}
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

		const Layout = Component.Layout?.Component || BaseLayout;
		const layoutProps =
			typeof Component.Layout?.props === 'function'
				? Component.Layout?.props(pageProps)
				: Component.Layout?.props || {};

		return (
			<>
				{independentProviders}
				<ComposeProviders providers={providers}>
					<Layout key={2} {...layoutProps}>
						<Component {...pageProps} />
					</Layout>
				</ComposeProviders>
			</>
		);
	}
}

const GlobalFont: FC = () => (
	<Head key={1}>
		{fontLinksProps.map((props, index) => (
			<link key={index} {...props} />
		))}
	</Head>
);
const GlobalCSS: FC = () => (
	<>
		{globalCSSList.map((cssString, index) => (
			<style jsx global key={index}>
				{cssString}
			</style>
		))}
	</>
);
const independentProviders = [
	<DefaultSeo key={0} {...defaultNextSeoConfig} />,
	<GlobalFont key={1} />,
	<GlobalCSS key={2} />,
	<AnalyticsProvider key={3} />,
];

const IS_WEB_VITALS_ENABLE = process.env.NEXT_PUBLIC_WEB_VITALS === 'true';
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
	if (IS_WEB_VITALS_ENABLE) console.log(metric);
};

export default MyApp;
