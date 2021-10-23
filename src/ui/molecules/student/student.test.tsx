import { create } from 'react-test-renderer';

import { Student } from 'ui/molecules';

describe('<Student>', () => {
	it("should match is's snapshot", () => {
		const component = create(<Student />).toJSON();
		expect(component).toMatchSnapshot();
	});
});
