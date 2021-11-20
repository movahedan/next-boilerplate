import { useEffect, useMemo, useRef, useState } from 'react';

import type {
	DependencyList,
	MutableRefObject,
	Dispatch,
	SetStateAction,
} from 'react';

const setupIntersection = (setVisibleRatio: Dispatch<SetStateAction<number>>) =>
	new IntersectionObserver(([{ intersectionRatio }]) => {
		setVisibleRatio(intersectionRatio);
	});

export const useIntersect = <Element extends HTMLElement = HTMLElement>(
	minimumRatio = 50,
	deps: DependencyList = []
) => {
	const [visibleRatio, setVisibleRatio] = useState(0);
	const ref = useRef<Element>();
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (!observer.current) {
			observer.current = setupIntersection(setVisibleRatio);
		}
		const currentObserver = observer.current;
		const currentElement = ref.current;

		if (currentElement) {
			observer.current.observe(currentElement);
		}

		return () => {
			if (currentObserver) {
				currentObserver.disconnect();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	const isIntersecting = useMemo(
		() => visibleRatio > minimumRatio,
		[minimumRatio, visibleRatio]
	);

	return [ref, isIntersecting] as [MutableRefObject<Element>, boolean];
};
