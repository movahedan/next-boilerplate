import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { WowTitle } from './wow-title';

describe('<WowTitle>', () => {
	it('should match snapshot', async () => {
		const component = create(<WowTitle>Wow</WowTitle>).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should match snapshot given another element', async () => {
		const component = create(<WowTitle as='p'>Wow</WowTitle>).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<WowTitle>Wow</WowTitle>);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
