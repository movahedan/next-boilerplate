import { useState } from 'react';

import { useMouseEffect } from './use-mouse-effect';

export const useMousePosition = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useMouseEffect((event) => {
		setPosition({
			x: event.x,
			y: event.y,
		});
	}, []);

	return position;
};
