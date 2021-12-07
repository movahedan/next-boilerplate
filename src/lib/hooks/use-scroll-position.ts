import { useEffect, useState } from 'react';

import { useScrollEffect } from './use-scroll-effect';

export const useScrollPosition = () => {
	const [position, setPosition] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);

	const onScroll = () => {
		const windowHeight = window.innerHeight;
		const windowOffset = window.pageYOffset;
		const documentHeight = document.body.offsetHeight;

		const scrollPosition = (windowOffset / documentHeight) * 100;
		const scrollHeight = (windowHeight / documentHeight) * 100;

		setPosition(scrollPosition);
		setScrollHeight(scrollHeight === 100 ? 0 : scrollHeight);
	};

	useEffect(() => {
		onScroll();
	}, []);
	useScrollEffect(() => {
		onScroll();
	}, []);

	return [position, scrollHeight];
};
