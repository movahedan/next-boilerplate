/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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
