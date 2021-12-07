import { Global } from '@emotion/react';

import { getIsMobileUserAgent } from 'lib/utils';

import { Mouse, Scrollbar } from 'ui/atoms';

import { CustomLayoutBgSvg } from './custom-bg-svg';
import { bgStyles, customLayoutGlobalStyles } from './custom-layout.styles';

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
			{!isTouch && <Scrollbar />}
			{!isTouch && <Mouse />}

			<main style={style} className={className}>
				{children}
			</main>

			<CustomLayoutBgSvg width='100vw' height='100vh' className={bgStyles} />
		</>
	);
};
