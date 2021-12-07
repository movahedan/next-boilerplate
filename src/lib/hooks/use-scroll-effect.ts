/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

import type { DependencyList } from 'react';

export const useScrollEffect = (
	callback: (event: Event) => void,
	deps: DependencyList
) => {
	const isLock = useRef(false);
	const animationFrame = useRef(0);

	const onScroll = useCallback((event) => {
		if (!isLock.current) {
			cancelAnimationFrame(animationFrame.current);
			animationFrame.current = requestAnimationFrame(() => {
				callback(event);

				setTimeout(() => {
					isLock.current = false;
				}, 10);
			});

			isLock.current = true;
		}
	}, deps);

	useEffect(() => {
		document.addEventListener('scroll', onScroll);

		return function () {
			cancelAnimationFrame(animationFrame.current);
			document.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);
};
