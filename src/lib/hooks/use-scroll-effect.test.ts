import { renderHook } from '@testing-library/react-hooks';

import { useScrollEffect } from './use-scroll-effect';

describe('useScrollEffect', () => {
	it('should call the callback on window scroll', () => {
		const callback = jest.fn();
		renderHook(() => useScrollEffect(callback, []));

		global.dispatchEvent(new Event('scroll'));
		expect(callback).toBeCalledTimes(1);
	});
});
