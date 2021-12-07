import { fireEvent } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react-hooks';

import { useScrollEffect } from './use-scroll-effect';

describe('useScrollEffect', () => {
	it('should call the callback on window scroll', async () => {
		const callback = jest.fn();
		const { waitFor } = renderHook(() => useScrollEffect(callback, []));

		act(() => {
			fireEvent.scroll(document);
		});

		await waitFor(() => {
			expect(callback).toBeCalledTimes(1);
		});
	});
});
