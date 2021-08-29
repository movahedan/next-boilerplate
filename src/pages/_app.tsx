import Head from 'next/head';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';

import { AnalyticsProvider } from 'lib/analytics';
import { withErrorHandler } from 'lib/errors';
import { isProduction, isWebVitalsEnable } from 'lib/utils';

import { BaseLayout } from 'ui';
import 'tailwindcss/tailwind.css';

import type { AppWithLayoutProps, NextWebVitalsMetric } from 'next/app';
import type { FC } from 'react';

const App: FC<AppWithLayoutProps> = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient());

	const Layout = Component.Layout?.Component || BaseLayout;
	const layoutProps =
		typeof Component.Layout?.props === 'function'
			? Component.Layout?.props(pageProps)
			: Component.Layout?.props || {};

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout {...layoutProps}>
						<Component {...pageProps} />
					</Layout>

					{isProduction && <AnalyticsProvider />}
				</Hydrate>

				<ReactQueryDevtools />
			</QueryClientProvider>

			<Head>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes'
				/>
				<title>Next.js</title>
			</Head>
		</>
	);
};

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
	if (isWebVitalsEnable) console.log(metric);
};

export default withErrorHandler(App);
