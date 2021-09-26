import { create } from 'react-test-renderer';

import { BaseLayout } from './base-layout';

describe('<BaseLayout>', () => {
	it("should match is's snapshot", () => {
		const component = create(<BaseLayout />).toJSON();
		expect(component).toMatchSnapshot();
	});
});
