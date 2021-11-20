import { useEffect, useRef } from 'react';

import type { DependencyList } from 'react';

export const useThrottleEffect = (
	callback: () => void,
	deps: DependencyList,
	ms = 200
) => {
	const timeout = useRef<NodeJS.Timeout | null>(null);

	return useEffect(() => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		timeout.current = setTimeout(callback, ms);

		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
