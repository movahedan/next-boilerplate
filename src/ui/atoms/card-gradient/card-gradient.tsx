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
	<OuterAs className={[wrapperClassName, variant].join(' ')}>
		<div tw='h-full bg-dark rounded-20px'>
			<div className={[middleClassName, variant].join(' ')}>
				<InnerAs className={containerClassName}>{children}</InnerAs>
			</div>
		</div>
	</OuterAs>
);
