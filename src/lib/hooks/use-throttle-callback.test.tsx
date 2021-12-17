import { render, act } from '@testing-library/react';
import { renderHook, act as actHook } from '@testing-library/react-hooks';
import { useEffect, useState } from 'react';

import { waitForMilliseconds } from 'lib/utils';

import { useThrottleCallback } from './use-throttle-callback';

describe('useThrottleCallback', () => {
	it('should throttle the callback', async () => {
		let container;

		await act(async () => {
			({ container } = render(<Dummy />));
			await waitForMilliseconds(400);
		});

		expect(container).toHaveTextContent('1');
	});

	it('should not calling effect when it is unmounted', () => {
		const callback = jest.fn();
		const { rerender, waitFor, unmount } = renderHook(() =>
			useThrottleCallback(callback, [])
		);

		actHook(() => {
			rerender();
		});
		unmount();

		waitFor(() => {
			expect(callback).toHaveBeenCalledTimes(0);
		});
	});
});

const Dummy = () => {
	const [state, setState] = useState(0);
	const [results, setResults] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setState((prev) => (prev + 1 < 5 ? prev + 1 : prev));
		}, 0);
	}, []);

	const callback = useThrottleCallback(
		() => setResults((prev) => prev + 1),
		[]
	);

	useEffect(() => {
		callback();
	}, [callback, state]);

	return <>{results}</>;
};
