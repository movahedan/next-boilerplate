import { render } from '@testing-library/react';

import { mockMatchMedia } from '__mocks__/mock-media-query.jest';

import type { Screens } from 'constants/css';

import {
	useBrowser,
	BrowserProvider,
	withBrowserServerSideData,
} from './browser';
import {
	mediaQueries,
	initBrowserContext,
	getMatchMediaEntries,
} from './browser.utils';

import type { BrowserObject } from './browser.d';
import type { FC, ReactNode } from 'react';

describe('browser module', () => {
	describe('withBrowserServerSideData', () => {
		let result = withBrowserServerSideData({}, { 'user-agent': '' });
		expect(result).toStrictEqual({
			browser: {
				mediaQueries: {
					sm: true,
					md: false,
					lg: false,
				},
			},
		});

		result = withBrowserServerSideData({}, { 'user-agent': 'iPad' });
		expect(result).toStrictEqual({
			browser: {
				mediaQueries: {
					sm: true,
					md: true,
					lg: false,
				},
			},
		});

		result = withBrowserServerSideData({}, { 'user-agent': 'AppleTv' });
		expect(result).toStrictEqual({
			browser: {
				mediaQueries: {
					sm: true,
					md: true,
					lg: true,
				},
			},
		});
	});

	describe('browser utils', () => {
		it('should have getMatchMediaEntries calculator', () => {
			const mockedMatchMedia = mockMatchMedia('sm', true);
			const matchMediaEntries = getMatchMediaEntries();
			Object.entries(mediaQueries).forEach(([, value], index) => {
				expect(matchMediaEntries[index][1]).toStrictEqual(
					JSON.parse(JSON.stringify(mockedMatchMedia(value)))
				);
			});
		});

		it('initBrowserContext - client side - should return correctly', () => {
			const mockedMatchMedia = mockMatchMedia('sm', true);
			const browserContext = initBrowserContext();
			Object.entries(mediaQueries).forEach(([key, value]) => {
				expect(browserContext.mediaQueries[key as keyof Screens]).toStrictEqual(
					mockedMatchMedia(value).matches
				);
			});
		});

		describe('initBrowserContext - server side', () => {
			const { window } = global;
			beforeAll(() => {
				// @ts-ignore
				delete global.window;
			});
			afterAll(() => {
				global.window = window;
			});

			it('runs without error', () => {
				const browserContext = initBrowserContext();
				const expectedMediaQueries = [
					['sm', true],
					['md', false],
					['lg', false],
				];

				Object.entries(mediaQueries).forEach(([key], index) => {
					expect(
						browserContext.mediaQueries[key as keyof Screens]
					).toStrictEqual(expectedMediaQueries[index][1]);
				});
			});
		});
	});

	describe('browser context', () => {
		const browserProvidedRender = (
			component: ReactNode,
			props?: BrowserObject['browser']
		) =>
			render(
				<BrowserProvider initialData={{ browser: props }}>
					{component}
				</BrowserProvider>
			);

		it('should have a provider that provides media query data for "sm"', () => {
			mockMatchMedia('sm');

			const { getByTestId } = browserProvidedRender(
				<JustForTest />,
				initBrowserContext()
			);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('false');
			expect(getByTestId('lg')).toHaveTextContent('false');
		});

		it('should have a provider that media query data for "md"', () => {
			mockMatchMedia('md');

			const { getByTestId } = browserProvidedRender(<JustForTest />);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('true');
			expect(getByTestId('lg')).toHaveTextContent('false');
		});

		it('should have a provider that media query data for "lg"', () => {
			mockMatchMedia('md');

			const { getByTestId } = browserProvidedRender(<JustForTest />);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('true');
			expect(getByTestId('lg')).toHaveTextContent('false');
		});

		it('should support initial props to prevent rerendering on first land in browser', () => {
			const { getByTestId } = browserProvidedRender(<JustForTest />, {
				mediaQueries: { sm: true, md: true, lg: true },
			});

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('true');
			expect(getByTestId('lg')).toHaveTextContent('true');
		});
	});
});

const JustForTest: FC = () => {
	const mediaQueries = useBrowser().mediaQueries;
	const mediaQueryEntries = Object.entries(mediaQueries);

	return (
		<ul>
			{mediaQueryEntries.map(([key, value]) => (
				<li key={key} data-testid={key}>
					{`${value}`}
				</li>
			))}
		</ul>
	);
};
