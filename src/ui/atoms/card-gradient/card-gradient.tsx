import { cx } from '@emotion/css';

import {
	containerClassName,
	wrapperClassName,
	middleClassName,
} from './card-gradient.styles';

import type { FC } from 'react';

interface CardGradientProps {
	as?: keyof JSX.IntrinsicElements;
	innerAs?: keyof JSX.IntrinsicElements;
	variant: 'blue' | 'yellow';
}

export const CardGradient: FC<CardGradientProps> = ({
	as: OuterAs = 'div',
	innerAs: InnerAs = 'div',
	variant,
	children,
}) => (
	<OuterAs className={cx(wrapperClassName, variant)}>
		<div className={middleClassName}>
			<InnerAs className={containerClassName}>{children}</InnerAs>
		</div>
	</OuterAs>
);
