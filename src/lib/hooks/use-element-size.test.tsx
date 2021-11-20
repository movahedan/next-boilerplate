import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useElementSize } from './use-element-size';

const mockBoundingClientRect = (width: number, height: number) => {
	// @ts-expect-error mocking bounding client rect
	Element.prototype.getBoundingClientRect = jest.fn(() => ({ width, height }));
};

describe('useElementSize', () => {
	beforeEach(() => {
		mockBoundingClientRect(0, 0);
	});

	it('should return the size of element', () => {
		mockBoundingClientRect(120, 60);
		const { getByTestId } = render(<Dummy />);

		expect(getByTestId('width')).toHaveTextContent('120');
		expect(getByTestId('height')).toHaveTextContent('60');
	});

	it('should update the size of element on window resize', () => {
		mockBoundingClientRect(120, 60);
		const { getByTestId } = render(<Dummy />);

		expect(getByTestId('width')).toHaveTextContent('120');
		expect(getByTestId('height')).toHaveTextContent('60');

		mockBoundingClientRect(60, 120);
		global.dispatchEvent(new Event('resize'));

		expect(getByTestId('width')).toHaveTextContent('60');
		expect(getByTestId('height')).toHaveTextContent('120');
	});

	it('should return default value when the ref is not connected to any element', () => {
		mockBoundingClientRect(120, 60);
		const { result } = renderHook(() => useElementSize());

		const { width, height } = result.current[1];

		expect(width).toBe(0);
		expect(height).toBe(0);
	});
});

const Dummy = () => {
	const [ref, size] = useElementSize<HTMLDivElement>();

	return (
		<>
			<div ref={ref} />
			<div data-testid='width'>{size.width}</div>
			<div data-testid='height'>{size.height}</div>
		</>
	);
};
