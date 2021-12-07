import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import {
	mobileUserAgentCases,
	desktopUserAgentCases,
} from '__mocks__/mock-user-agent.jest';

import { CustomLayout } from './custom-layout';

describe('<CustomLayout>', () => {
	it('should match snapshot', async () => {
		Object.setPrototypeOf(global.window.navigator, {
			userAgent: undefined,
		});

		const component = create(<CustomLayout />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should match snapshot on mobile', async () => {
		Object.setPrototypeOf(global.window.navigator, {
			userAgent: mobileUserAgentCases[0][1],
		});

		const component = create(<CustomLayout />).toJSON();
		expect(component).toMatchSnapshot('mobile');
	});

	it('should match snapshot on desktop', async () => {
		Object.setPrototypeOf(global.window.navigator, {
			userAgent: desktopUserAgentCases[0][1],
		});

		const component = create(<CustomLayout />).toJSON();
		expect(component).toMatchSnapshot('desktop');
	});

	it('should be accessible', async () => {
		const { container } = render(<CustomLayout />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
