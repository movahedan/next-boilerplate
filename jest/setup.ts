/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom/extend-expect';
import { matchers } from '@emotion/jest';
import { toHaveNoViolations } from 'jest-axe';
import jestFetchMock from 'jest-fetch-mock';

jestFetchMock.enableMocks();
beforeEach(() => {
	jestFetchMock.resetMocks();
});
afterAll(() => {
	jestFetchMock.disableMocks();
});

expect.extend(toHaveNoViolations);
expect.extend(matchers);

// @ts-expect-error mocking readonly variable geoLocation
window.navigator.geolocation = {
	clearWatch: jest.fn(),
	getCurrentPosition: jest.fn(),
	watchPosition: jest.fn(),
};

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
