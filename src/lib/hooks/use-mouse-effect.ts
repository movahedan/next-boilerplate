/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';

import type { DependencyList } from 'react';

type MouseEffect = (event: MouseEvent) => void;
export const useMouseEffect = (callback: MouseEffect, deps: DependencyList) => {
	const isLock = useRef(false);
	const animationFrame = useRef(0);
	const [documentIsVisible, setDocumentIsVisible] = useState(true);

	useEffect(() => {
		const onVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				setDocumentIsVisible(true);
			} else {
				setDocumentIsVisible(false);
			}
		};

		document.addEventListener('visibilitychange', onVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	}, []);

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			if (documentIsVisible) {
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
			}
		};

		document.addEventListener('mousemove', onMouseMove);

		return () => {
			cancelAnimationFrame(animationFrame.current);
			document.removeEventListener('mousemove', onMouseMove);
		};
	}, [documentIsVisible, ...deps]);
};
