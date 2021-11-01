import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { mockUseRouter } from '__mocks__/mock-router.jest';
import App, { reportWebVitals } from 'pages/_app';

import { BaseLayout } from 'ui/templates';

import type { NextPage, NextPageWithLayout } from 'next';
import type { NextWebVitalsMetric } from 'next/app';
import type { Router } from 'next/router';

const router = mockUseRouter();

describe('_app.ts', () => {
	it('should be accessible', async () => {
		const { container } = render(
			<App Component={() => null} pageProps={{}} router={router as Router} />
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should match snapshot', () => {
		const component = create(
			<App Component={() => null} pageProps={{}} router={router as Router} />
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should match snapshot while an error occurred', () => {
		const component = create(
			<App
				Component={() => {
					throw Error('error');
				}}
				pageProps={{}}
				router={router as Router}
			/>
		).toJSON();
		expect(component).toMatchSnapshot('error');
	});

	it('should match snapshot while a layout is attached to page', () => {
		const Component: NextPageWithLayout = () => null;
		Component.Layout = {
			Component: BaseLayout,
			props: {},
		};

		const component = create(
			<App
				Component={Component as NextPage}
				pageProps={{}}
				router={router as Router}
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
				Component={Component as NextPage}
				pageProps={{ layoutClassName: 'text-white' }}
				router={router as Router}
			/>
		).toJSON();
		expect(component).toMatchSnapshot('with-layout-customized-props');
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

		consoleLog = jest.spyOn(console, 'log').mockImplementation(() => undefined);
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
