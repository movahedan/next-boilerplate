import { createContext } from 'react';

import { initialSampleContext } from './sample.initialData';

import type { SampleModelContextType } from './sample';

export const SampleModelContext =
	createContext<SampleModelContextType>(initialSampleContext);
