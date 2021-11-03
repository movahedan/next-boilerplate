import { useEffect, useRef } from 'react';

import { fetchSampleList } from './fetchers';

import type { SampleModelContextType } from './sample';

type UseAllProductCategoriesInitializer = (
	setState?: SampleModelContextType[1],
	initialData?: null | SampleModelContextType[0]
) => void;

export const useSampleModelInitializer: UseAllProductCategoriesInitializer = (
	setState,
	initialData
) => {
	const isAliveRef = useRef(false);
	const initialDataRef = useRef(initialData);

	useEffect(() => {
		const shouldFetch =
			initialDataRef.current === undefined && typeof setState === 'function';

		if (shouldFetch) {
			fetchSampleList().then(({ data, error }) => {
				if (isAliveRef.current) {
					if (data) setState?.(data);
					if (error) console.error(error);
				}
			});
		}

		return () => {
			isAliveRef.current = false;
		};
	}, [setState]);
};
