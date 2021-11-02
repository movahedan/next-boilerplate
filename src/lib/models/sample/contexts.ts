import { createContext } from 'react';

import { initialSampleContext } from './initialData';

import type { SampleModelContextType } from './sample.d';

export const SampleModelContext =
	createContext<SampleModelContextType>(initialSampleContext);
