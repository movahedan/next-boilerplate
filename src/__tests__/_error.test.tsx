import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import ErrorPage from 'pages/_error';

describe('<ErrorPage>', () => {
	it('should match snapshot', async () => {
		const component = create(<ErrorPage />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ErrorPage />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
