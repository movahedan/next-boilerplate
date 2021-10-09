import { create } from 'react-test-renderer';

import {
	GlobalCSS,
	bodyCSS,
	fontOvverridesCSS,
	safeAreaPaddingForNotchs,
} from './global-css';

describe('<GlobalCSS>', () => {
	it("should matches it's snapshots", () => {
		const fontLinks = create(<GlobalCSS />).toJSON();
		expect(fontLinks).toMatchSnapshot();
	});

	it("bodyCSS sould matches it's snapshots", () => {
		expect(bodyCSS).toMatchSnapshot();
	});

	it("safeAreaPaddingForNotchs sould matches it's snapshots", () => {
		expect(safeAreaPaddingForNotchs).toMatchSnapshot();
	});

	it("fontOvverridesCSS sould matches it's snapshots", () => {
		expect(fontOvverridesCSS).toMatchSnapshot();
	});
});
