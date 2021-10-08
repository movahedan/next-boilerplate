import { create } from 'react-test-renderer';

import { RecentStudent } from 'ui';

describe('<RecentStudent>', () => {
	it("should match is's snapshot", () => {
		const component = create(<RecentStudent />).toJSON();
		expect(component).toMatchSnapshot();
	});
});
