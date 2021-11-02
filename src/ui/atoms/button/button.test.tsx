import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { Button } from 'ui/atoms';

describe('<Button>', () => {
	it("should match is's snapshot", () => {
		const component = create(<Button />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<Button />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
