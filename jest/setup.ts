/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom/extend-expect';
import { loadEnvConfig } from '@next/env';
import { toHaveNoViolations } from 'jest-axe';
import jestFetchMock from 'jest-fetch-mock';

import { server } from './server';

expect.extend(toHaveNoViolations);

// Establish API mocking before all tests.
beforeAll(() => {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);

	server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			media: '',
			matches: false,
			onchange: function () {},
			dispatchEvent: function () {
				return false;
			},
			addListener: function () {},
			removeListener: function () {},
			addEventListener: function () {},
			removeEventListener: function () {},
		};
	};

jestFetchMock.enableMocks();
