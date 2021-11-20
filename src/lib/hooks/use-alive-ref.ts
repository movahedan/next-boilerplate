import { useRef, useEffect } from 'react';

export const useAliveRef = () => {
	const isAliveRef = useRef(true);

	useEffect(() => {
		isAliveRef.current = true;

		return () => {
			isAliveRef.current = false;
		};
	}, []);

	return isAliveRef;
};
