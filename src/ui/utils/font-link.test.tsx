import { create } from 'react-test-renderer';

import { FontLink } from './font-link';

describe('<FontLink>', () => {
	it("should matches it's snapshots", () => {
		const fontLinks = create(<FontLink />).toJSON();
		expect(fontLinks).toMatchSnapshot();
	});
});
