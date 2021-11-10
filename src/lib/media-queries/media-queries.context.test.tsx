import { render, waitFor } from '@testing-library/react';

import { mockMatchMedia } from '__mocks__/mock-media-query.jest';

import { useMediaQueries, MediaQueriesProvider } from './media-queries';
import { mediaQueriesEntries } from './media-queries.constants';
import { initMediaQueriesContext } from './media-queries.context';

import type { ScreenNames } from './media-queries.d';
import type { FC, ReactNode } from 'react';

describe('media-queries context', () => {
	describe('server side', () => {
		const { window } = global;
		beforeEach(() => {
			// @ts-ignore
			delete global.window;
		});
		afterAll(() => {
			global.window = window;
		});

		it('should return media queries with a default screen: sm', () => {
			const mediaQueriesContext = initMediaQueriesContext();
			const expectedMediaQueries = [
				['sm', true],
				['md', false],
				['lg', false],
			];

			mediaQueriesEntries.forEach(([key], index) => {
				expect(mediaQueriesContext[key as ScreenNames]).toStrictEqual(
					expectedMediaQueries[index][1]
				);
			});
		});

		it('should return media queries for lg when the default value of isMobile is false', () => {
			const mediaQueriesContext = initMediaQueriesContext('lg');
			const expectedMediaQueries = [
				['sm', false],
				['md', false],
				['lg', true],
			];

			mediaQueriesEntries.forEach(([key], index) => {
				expect(mediaQueriesContext[key as ScreenNames]).toStrictEqual(
					expectedMediaQueries[index][1]
				);
			});
		});
	});

	describe('client side', () => {
		const mediaQueriesProvidedRender = (
			component: ReactNode,
			props?: { isMobile: boolean }
		) =>
			render(
				<MediaQueriesProvider initialData={{ mediaQueries: props }}>
					{component}
				</MediaQueriesProvider>
			);

		beforeAll(() => {
			mockMatchMedia();
		});

		it('should have a provider that provides media query data for "sm"', () => {
			mockMatchMedia('sm');

			const { getByTestId } = mediaQueriesProvidedRender(<JustForTest />);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('false');
			expect(getByTestId('lg')).toHaveTextContent('false');
		});

		it('should have a provider that media query data for "md"', () => {
			mockMatchMedia('md');

			const { getByTestId } = mediaQueriesProvidedRender(<JustForTest />);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('true');
			expect(getByTestId('lg')).toHaveTextContent('false');
		});

		it('should have a provider that media query data for "lg"', () => {
			mockMatchMedia('lg');

			const { getByTestId } = mediaQueriesProvidedRender(<JustForTest />);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('true');
			expect(getByTestId('lg')).toHaveTextContent('true');
		});

		it('initMediaQueriesContext', () => {
			const mockedMatchMedia = mockMatchMedia();
			const mediaQueriesContext = initMediaQueriesContext();
			mediaQueriesEntries.forEach(([key, value]) => {
				expect(mediaQueriesContext[key as ScreenNames]).toStrictEqual(
					mockedMatchMedia(value).matches
				);
			});
		});

		it('should watch for changes in matchMedias and behave correctly', () => {
			const mockedMatchMedia = mockMatchMedia();

			const { getByTestId } = mediaQueriesProvidedRender(<JustForTest />);

			expect(getByTestId('sm')).toHaveTextContent('true');
			expect(getByTestId('md')).toHaveTextContent('false');
			expect(getByTestId('lg')).toHaveTextContent('false');

			mockMatchMedia('lg');
			mockedMatchMedia().onchange();

			waitFor(() => {
				expect(getByTestId('sm')).toHaveTextContent('true');
				expect(getByTestId('md')).toHaveTextContent('true');
				expect(getByTestId('lg')).toHaveTextContent('true');
			});
		});
	});
});

const JustForTest: FC = () => {
	const mediaQueries = useMediaQueries();
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
