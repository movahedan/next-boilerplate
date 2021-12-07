import { cx } from '@emotion/css';

import {
	wrapperClassName,
	middleClassName,
	containerClassName,
} from './card-gradient.styles';

import type { FC } from 'react';

interface CardGradientProps {
	as?: keyof JSX.IntrinsicElements;
	innerAs?: keyof JSX.IntrinsicElements;
	variant: 'blue' | 'yellow';
	className?: string;
	innerClassName?: string;
}

export const CardGradient: FC<CardGradientProps> = ({
	as: OuterAs = 'div',
	innerAs: InnerAs = 'div',
	variant,
	className: outerClassName,
	innerClassName,
	children,
}) => (
	<OuterAs className={cx(wrapperClassName, variant, outerClassName)}>
		<div className={middleClassName}>
			<InnerAs className={cx(containerClassName, innerClassName)}>
				{children}
			</InnerAs>
		</div>
	</OuterAs>
);
