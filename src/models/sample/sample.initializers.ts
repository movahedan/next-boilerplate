import { useEffect, useRef } from 'react';

import { fetchSampleList } from './sample.fetchers';

import type { SampleModelContextType } from './sample';

type UseAllProductCategoriesInitializer = (
	setState: SampleModelContextType[1],
	initialData?: null | SampleModelContextType[0]
) => void;

export const useSampleModelInitializer: UseAllProductCategoriesInitializer = (
	setState,
	initialData
) => {
	const initialDataRef = useRef(initialData);

	useEffect(() => {
		const shouldFetch =
			initialDataRef.current === undefined && typeof setState === 'function';

		if (shouldFetch) {
			fetchSampleList()
				.then((data) => setState(data))
				.catch(console.error);
		}
	}, [setState]);
};
