import { create } from 'react-test-renderer';

import { GButton } from 'ui';

describe('<GButton>', () => {
	it("should match is's snapshot", () => {
		const component = create(<GButton />).toJSON();
		expect(component).toMatchSnapshot();
	});
});
