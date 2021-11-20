import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useEffect, useState } from 'react';

import { waitForMilliseconds } from 'lib/utils';

import { useThrottleEffect } from './use-throttle-effect';

describe('useThrottleEffect', () => {
	it('should throttle the effect', async () => {
		const callback = jest.fn();
		render(<Dummy callback={callback} />);
		await waitForMilliseconds(400);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should not calling effect when it is unmounted', () => {
		const callback = jest.fn();
		const { rerender, waitFor, unmount } = renderHook(() =>
			useThrottleEffect(callback, [])
		);

		rerender();
		unmount();

		waitFor(() => {
			expect(callback).toHaveBeenCalledTimes(0);
		});
	});
});

const Dummy = ({ callback }: { callback: () => void }) => {
	const [state, setState] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setState((prev) => (prev + 1 < 5 ? prev + 1 : prev));
		}, 0);
	}, []);

	useThrottleEffect(callback, [callback, state]);

	return null;
};
