import { fireEvent } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';

import { useMouseEffect } from './use-mouse-effect';

describe('useMouseEffect', () => {
	it('should call the callback on window mouse move', async () => {
		const callback = jest.fn();
		const { waitFor } = renderHook(() => useMouseEffect(callback, []));

		fireEvent.mouseMove(document);
		fireEvent.mouseMove(document);
		fireEvent.mouseMove(document);

		await waitFor(() => {
			expect(callback).not.toHaveBeenCalledTimes(3);
			expect(callback).toBeCalledTimes(1);
		});
	});

	it('should call the callback on window mouse move every 10 ms', async () => {
		const callback = jest.fn();
		const { waitFor } = renderHook(() => useMouseEffect(callback, []));

		fireEvent.mouseMove(document);
		await waitFor(() => {
			expect(callback).toBeCalledTimes(1);
		});

		fireEvent.mouseMove(document);
		await waitFor(() => {
			expect(callback).toBeCalledTimes(1);
		});
	});
});
