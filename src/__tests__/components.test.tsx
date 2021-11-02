import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import ComponentSamplePage from 'pages/components';

describe('<ComponentSamplePage>', () => {
	it('should match snapshot', async () => {
		const component = create(<ComponentSamplePage />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ComponentSamplePage />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
