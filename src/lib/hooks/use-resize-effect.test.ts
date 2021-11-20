import { renderHook } from '@testing-library/react-hooks';

import { useResizeEffect } from './use-resize-effect';

describe('useResizeEffect', () => {
	it('should call the callback on window resize', () => {
		const callback = jest.fn();
		renderHook(() => useResizeEffect(callback, []));

		global.dispatchEvent(new Event('resize'));
		expect(callback).toBeCalledTimes(1);
	});
});
