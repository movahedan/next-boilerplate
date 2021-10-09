import React, { Children, cloneElement, isValidElement } from 'react';

export type ComposeProvidersProps = {
	providers?: React.ReactElement[];
};

export const ComposeProviders: React.FC<ComposeProvidersProps> = ({
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
