import type { Dispatch, SetStateAction } from 'react';

export type Sample = {
	value: string;
};

export type SampleModelContextType = [
	Sample,
	undefined | Dispatch<SetStateAction<Sample>>
];

export interface AllProductCategoriesObject {
	sampleModel?: Sample;
}
