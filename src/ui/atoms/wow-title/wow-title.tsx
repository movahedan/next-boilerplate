import { wowTitleClassName } from './wow-title.styles';

import type { FC } from 'react';

interface WowTitleInterface {
	as?: string;
}

export const WowTitle: FC<WowTitleInterface> = ({
	as: asComponent,
	children,
}) => {
	const CustomElement = asComponent || 'span';

	return (
		// @ts-ignore
		<CustomElement className={wowTitleClassName}>{children}</CustomElement>
	);
};
