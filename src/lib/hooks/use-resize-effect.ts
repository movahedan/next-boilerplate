import { useEffect } from 'react';

import type { DependencyList } from 'react';

export const useResizeEffect = (
	callback: (event: WindowEventMap['scroll']) => void,
	deps: DependencyList
) =>
	useEffect(() => {
		window.removeEventListener('resize', callback);
		window.addEventListener('resize', callback);

		return () => {
			window.removeEventListener('resize', callback);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
