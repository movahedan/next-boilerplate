import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { Scrollbar } from './scrollbar';

describe('<Scrollbar>', () => {
	it('should match snapshot', async () => {
		const component = create(<Scrollbar />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<Scrollbar />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
