import { Children, cloneElement, isValidElement } from 'react';

import type { FC, ReactElement } from 'react';

export type ComposeProvidersProps = {
	providers?: ReactElement[];
};

export const ComposeProviders: FC<ComposeProvidersProps> = ({
	children,
	providers = [],
}) => (
	<>
		{Children.toArray(providers)
			.filter(isValidElement)
			.reduceRight(
				(children, provider) => cloneElement(provider, {}, children),
				children
			)}
	</>
);
