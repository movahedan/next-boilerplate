import { useEffect, useRef } from 'react';

import type { DependencyList } from 'react';

export const useScrollEffect = (
	callback: (event: WindowEventMap['scroll']) => void,
	deps: DependencyList
) => {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const element = ref.current || window;

		element.removeEventListener('scroll', callback);
		element.addEventListener('scroll', callback);

		return () => {
			element.removeEventListener('scroll', callback);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return ref;
};
