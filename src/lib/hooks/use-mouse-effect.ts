/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback } from 'react';

import type { DependencyList } from 'react';

type MouseEffect = (event: MouseEvent) => void;
export const useMouseEffect = (callback: MouseEffect, deps: DependencyList) => {
	const isLock = useRef(false);
	const animationFrame = useRef(0);

	const onMouseMove = useCallback<MouseEffect>((event) => {
		if (!isLock.current) {
			isLock.current = true;
			cancelAnimationFrame(animationFrame.current);

			animationFrame.current = requestAnimationFrame(() => {
				callback(event);
			});
		} else {
			setTimeout(() => {
				isLock.current = false;
			}, 10);
		}
	}, deps);

	useEffect(() => {
		document.addEventListener('mousemove', onMouseMove);

		return () => {
			cancelAnimationFrame(animationFrame.current);
			document.removeEventListener('mousemove', onMouseMove);
		};
	}, [onMouseMove]);
};
