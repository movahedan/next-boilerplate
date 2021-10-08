import { createContext } from 'react';

import { initialSampleContext } from './initialData';

import type { SampleModelContextType } from './types';

export const SampleModelContext =
	createContext<SampleModelContextType>(initialSampleContext);
