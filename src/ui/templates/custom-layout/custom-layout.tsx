import { Global } from '@emotion/react';

import { getIsMobileUserAgent } from 'lib/utils';

import { Mouse, Scrollbar } from 'ui/atoms';

import { CustomLayoutBg } from './custom-layout-bg';
import { customLayoutGlobalStyles } from './custom-layout.styles';

import type { FC, CSSProperties } from 'react';

export interface CustomLayoutProps {
	style?: CSSProperties;
	className?: string;
}

export const CustomLayout: FC<CustomLayoutProps> = ({
	style,
	className,
	children,
}) => {
	const isTouch = getIsMobileUserAgent(
		global.window?.navigator.userAgent ?? ''
	);

	return (
		<>
			<Global styles={customLayoutGlobalStyles} />

			<main style={style} className={className}>
				{children}
			</main>

			{!isTouch && <Scrollbar />}
			{!isTouch && <Mouse />}
			<CustomLayoutBg className='custom-layout-bg' />
		</>
	);
};
