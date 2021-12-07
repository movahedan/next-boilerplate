import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { Mouse } from './mouse';

describe('<Mouse>', () => {
	it('should match snapshot', async () => {
		const component = create(<Mouse />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<Mouse />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
