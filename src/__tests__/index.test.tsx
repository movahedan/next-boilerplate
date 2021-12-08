import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import Homepage from 'pages/index';

describe('<Homepage>', () => {
	it('should match snapshot', async () => {
		const component = create(<Homepage />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<Homepage />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
