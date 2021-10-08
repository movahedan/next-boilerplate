import { render } from '@testing-library/react';

import { mockMatchMedia } from '__mocks__/mock-media-query.jest';
import { mediaQueries } from 'lib/utils';

import {
	useMediaQuery,
	BrowserProvider,
	mediaQueryInitializer,
	attachBrowserServerSideData,
	extractBrowserServerSideData,
	getMatchMediaEntries,
	getMatchMediasByGivenMediaQuery,
} from '.';

import type { BrowserObject } from '.';
import type { IncomingMessage } from 'http';
import type { Screens } from 'lib/utils';
import type { FC, ReactNode } from 'react';

describe('browser module', () => {
	beforeEach(() => {
		mockMatchMedia('sm');
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

		it('should have mediaQueryInitializer calculator', () => {
			const mockedMatchMedia = mockMatchMedia('sm', true);
			const currentMediaQuery = mediaQueryInitializer();

			Object.entries(mediaQueries).forEach(([key, value]) => {
				expect(currentMediaQuery[key as keyof Screens]).toStrictEqual(
					mockedMatchMedia(value).matches
				);
			});
		});
	});

	describe('browser context', () => {
		const browserProvidedRender = (
			component: ReactNode,
			props?: BrowserObject['browser']
		) =>
			render(
				<BrowserProvider initialData={props}>{component}</BrowserProvider>
			);

		it('should have a provider that provides media query data for "sm"', () => {
			const { getByTestId } = browserProvidedRender(<JustForTest />, {
				mediaQuery: mediaQueryInitializer(),
			});

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
				mediaQuery: { sm: true, md: true, lg: true },
			});

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('true');
			expect(getByTestId('lg')).toHaveTextContent('true');
		});
	});

	describe('browser integration', () => {
		const mockReq: Partial<IncomingMessage> = {
			headers: {
				'user-agent': '',
			},
		};

		it('should have a attacher function to attach browser data to page props', () => {
			try {
				attachBrowserServerSideData();
			} catch (e) {
				expect(e).toMatchObject(
					new Error('[attachBrowserServerSideData]: req is undefined')
				);
			}

			const attachedDataToPageProps = attachBrowserServerSideData(mockReq);
			expect(attachedDataToPageProps).toMatchObject({
				browser: {
					mediaQuery: getMatchMediasByGivenMediaQuery('lg'),
				},
			});
		});

		it('should have a extractor function to extract browser data from page props', () => {
			mockMatchMedia('sm');

			const extractedDataFromPageProps = extractBrowserServerSideData({
				anotherprops: '',
				browser: {
					mediaQuery: mediaQueryInitializer(),
				},
			});

			expect(extractedDataFromPageProps).toMatchObject({
				mediaQuery: mediaQueryInitializer(),
			});
		});
	});
});

const JustForTest: FC = () => {
	const mediaQuery = useMediaQuery();
	const mediaQueryEntries = Object.entries(mediaQuery);

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
