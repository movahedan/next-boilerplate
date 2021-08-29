/* eslint-disable import/no-unassigned-import */
/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';
import jestFetchMock from 'jest-fetch-mock';

import { server } from './server';

expect.extend(toHaveNoViolations);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// @ts-ignore
window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
			addEventListener: function () {},
			removeEventListener: function () {},
		};
	};

jestFetchMock.enableMocks();
