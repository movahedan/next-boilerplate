import { create } from 'react-test-renderer';

import { mockUseRouter } from '__mocks__/mock-router.jest';
import App, { reportWebVitals } from 'pages/_app';

import { BaseLayout } from 'ui/templates';

import type { NextPage, NextPageWithLayout } from 'next';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import type { Router } from 'next/router';

const router = mockUseRouter();

describe('_app.tsx', () => {
	let defaultAppProps: AppProps;

	beforeEach(() => {
		defaultAppProps = {
			Component: () => null,
			pageProps: {},
			router: router as Router,
		};
	});

	it('should match snapshot', () => {
		const component = create(<App {...defaultAppProps} />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should match snapshot while an error occurred', () => {
		const component = create(
			<App
				{...defaultAppProps}
				Component={() => {
					throw Error('error');
				}}
			/>
		).toJSON();
		expect(component).toMatchSnapshot('error');
	});

	describe('Layout per page', () => {
		it('should match snapshot while a layout is attached to page', () => {
			const Component: NextPageWithLayout = () => null;
			Component.Layout = {
				Component: BaseLayout,
				props: {},
			};

			const component = create(
				<App
					{...defaultAppProps}
					Component={Component as AppProps['Component']}
				/>
			).toJSON();
			expect(component).toMatchSnapshot('with-layout');
		});

		it('should match snapshot while a layout is attached to page and the props of layout is customized', () => {
			const Component: NextPageWithLayout<
				{ layoutClassName: string },
				{ className?: string }
			> = () => null;
			Component.Layout = {
				Component: BaseLayout,
				props: ({ layoutClassName }) => ({ className: layoutClassName }),
			};

			const component = create(
				<App
					{...defaultAppProps}
					Component={Component as NextPage}
					pageProps={{ layoutClassName: 'text-white' }}
				/>
			).toJSON();
			expect(component).toMatchSnapshot('with-layout-customized-props');
		});
	});

	describe('Analytic integration', () => {
		const ORIGINAL_ENV = process.env;
		afterAll(() => {
			process.env = ORIGINAL_ENV;
		});
		beforeEach(() => {
			jest.resetModules();

			process.env = {
				...ORIGINAL_ENV,
				NODE_ENV: 'test',
				NEXT_PUBLIC_INDEXING_ENABLED: 'true',
			};
		});

		it('should match snapshot while noIndex is false', () => {
			const component = create(<App {...defaultAppProps} />).toJSON();
			expect(component).toMatchSnapshot('noIndex-is-false');
		});

		it('should match snapshot while noIndex is true', () => {
			process.env = {
				...ORIGINAL_ENV,
				NODE_ENV: 'test',
				NEXT_PUBLIC_INDEXING_ENABLED: undefined,
			};

			const component = create(<App {...defaultAppProps} />).toJSON();
			expect(component).toMatchSnapshot('noIndex-is-true');
		});
	});

	describe('reportWebVitals', () => {
		const ORIGINAL_ENV = process.env;
		afterAll(() => {
			process.env = ORIGINAL_ENV;
		});

		let consoleLog: jest.SpyInstance;
		const webVital: NextWebVitalsMetric = {
			id: '1',
			startTime: 1,
			value: 1,
			label: 'web-vital',
			name: 'FCP',
		};

		beforeEach(() => {
			jest.resetModules();

			process.env = {
				...ORIGINAL_ENV,
				NODE_ENV: 'test',
				NEXT_PUBLIC_WEB_VITALS: 'true',
			};

			consoleLog = jest
				.spyOn(console, 'log')
				.mockImplementation(() => undefined);
		});

		it('should log web vitals when the environment variable is available', () => {
			reportWebVitals(webVital);
			expect(consoleLog).toHaveBeenCalledWith(webVital);
		});

		it('should not log web vitals when the environment variable is unavailable', () => {
			process.env = {
				...ORIGINAL_ENV,
				NODE_ENV: 'test',
				NEXT_PUBLIC_WEB_VITALS: '',
			};

			reportWebVitals(webVital);
			expect(consoleLog).not.toHaveBeenCalled();
		});
	});
});
