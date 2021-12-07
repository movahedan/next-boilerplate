import { renderHook } from '@testing-library/react-hooks';

import { useMousePosition } from './use-mouse-position';

describe('useMousePosition', () => {
	it('should return default mouse position', async () => {
		const { result } = renderHook(() => useMousePosition());
		expect(result.current).toStrictEqual({ x: 0, y: 0 });
	});
});
