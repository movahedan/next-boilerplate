import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import NotFoundPage from 'pages/404';

describe('<404>', () => {
	it('should match snapshot', async () => {
		const component = create(<NotFoundPage />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<NotFoundPage />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
