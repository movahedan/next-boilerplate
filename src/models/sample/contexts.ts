import { createContext } from 'react';

import { initialSampleContext } from './initialData';

import type { SampleModelContextType } from './sample';

export const SampleModelContext =
	createContext<SampleModelContextType>(initialSampleContext);
