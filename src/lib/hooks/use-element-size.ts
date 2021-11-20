import { useEffect, useRef, useState } from 'react';

import type { MutableRefObject } from 'react';

export const useElementSize = <Element extends HTMLElement = HTMLElement>(
	{ width: initialWidth, height: initialHeight } = { width: 0, height: 0 }
) => {
	const ref = useRef<Element>(null);

	const [size, setSize] = useState({
		width: ref.current?.clientWidth || initialWidth || 0,
		height: ref.current?.clientHeight || initialHeight || 0,
	});

	useEffect(() => {
		const resize = () => {
			const { width = 0, height = 0 } =
				ref.current?.getBoundingClientRect() || {};

			setSize({ width, height });
		};

		resize();
		window.removeEventListener('resize', resize);
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	return [ref, size] as [MutableRefObject<Element>, typeof size];
};
