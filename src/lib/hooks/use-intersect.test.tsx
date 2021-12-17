// I could not finish the test, forgive me.
// The problem is that I don't know how to
// mock the exact observer to test state setter
import { render } from '@testing-library/react';

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

/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param MockIntersectionObserver - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the intersection observer, but its methods.
 */
export function mockIntersectionObserver({
	root = null,
	rootMargin = '',
	thresholds = [],
	disconnect = () => null,
	observe = () => null,
	takeRecords = () => [],
	unobserve = () => null,
} = {}): void {
	class MockIntersectionObserver implements IntersectionObserver {
		readonly root: Element | null = root;
		readonly rootMargin: string = rootMargin;
		readonly thresholds: ReadonlyArray<number> = thresholds;
		disconnect: () => void = disconnect;
		observe: (target: Element) => void = observe;
		takeRecords: () => IntersectionObserverEntry[] = takeRecords;
		unobserve: (target: Element) => void = unobserve;
	}

	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		configurable: true,
		value: MockIntersectionObserver,
	});

	Object.defineProperty(global, 'IntersectionObserver', {
		writable: true,
		configurable: true,
		value: MockIntersectionObserver,
	});
}
