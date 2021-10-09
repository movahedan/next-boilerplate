import { create } from 'react-test-renderer';

import { GlobalCSS } from './global-css';

describe('<GlobalCSS>', () => {
	it("should matches it's snapshots", () => {
		const fontLinks = create(<GlobalCSS />).toJSON();
		expect(fontLinks).toMatchSnapshot();
	});
});
