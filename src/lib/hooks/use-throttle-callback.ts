import { useCallback, useEffect, useRef } from 'react';

import type { DependencyList } from 'react';

export const useThrottleCallback = <Props = unknown, Result = unknown>(
	callback: (args?: Props) => Result,
	deps: DependencyList,
	ms = 200
) => {
	const isAlive = useRef(true);
	useEffect(() => {
		isAlive.current = true;

		return () => {
			isAlive.current = false;
		};
	}, []);

	const timeout = useRef<NodeJS.Timeout | null>(null);
	const throttledCallback = useCallback(
		(props?: Props) =>
			new Promise<Result>((resolve) => {
				if (timeout.current) {
					clearTimeout(timeout.current);
				}

				timeout.current = setTimeout(() => {
					if (isAlive.current) {
						resolve(callback(props));
					}
				}, ms);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		deps
	);

	return throttledCallback;
};
