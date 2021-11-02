import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { GButton } from 'ui/atoms';

describe('<GButton>', () => {
	it("should match is's snapshot", () => {
		const component = create(<GButton />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<GButton />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
