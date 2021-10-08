import { useState } from 'react';

import { SampleModelContext } from './contexts';
import { initialSampleContext } from './initialData';
import { useSampleModelInitializer } from './initializers';

import type { SampleModelContextType } from './types';
import type { FC } from 'react';

type SampleModelProviderType = FC<{
	initialData?: SampleModelContextType[0];
}>;

export const SampleModelProvider: SampleModelProviderType = ({
	initialData,
	children,
}) => {
	const [state, setState] = useState(initialData || initialSampleContext[0]);

	// In order to lazy fetch, comment this and see hooks.ts
	useSampleModelInitializer(setState, initialData);

	return (
		<SampleModelContext.Provider value={[state, undefined]}>
			{children}
		</SampleModelContext.Provider>
	);
};
