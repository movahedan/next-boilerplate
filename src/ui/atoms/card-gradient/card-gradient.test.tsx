import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { CardGradient } from './card-gradient';

describe('<CardGradient>', () => {
	it("should match is's blue variant snapshot", () => {
		const component = create(<CardGradient variant='blue' />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it("should match is's yellow variant snapshot", () => {
		const component = create(<CardGradient variant='yellow' />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<CardGradient variant='blue' />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
