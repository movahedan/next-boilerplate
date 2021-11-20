// I could not finish the test, forgive me.
// The problem is that I don't know how to
// mock the exact observer to test state setter
import { render } from '@testing-library/react';

import { mockIntersectionObserver } from '__mocks__/mock-intersection-observer.jest';

import { useIntersect } from './use-intersect';

mockIntersectionObserver();

describe('useIntersect', () => {
	it('should return isIntersecting value', () => {
		mockIntersectionObserver();

		const { getByTestId } = render(<Dummy />);

		expect(getByTestId('value')).toHaveTextContent('false');
	});
});

const Dummy = () => {
	const [ref, isIntersecting] = useIntersect<HTMLDivElement>();

	return (
		<>
			<div ref={ref} />
			<div data-testid='value'>{isIntersecting.toString()}</div>
		</>
	);
};
