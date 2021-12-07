import { css } from '@emotion/react';
import xw from 'xwind';

const nextDivStyles = xw`relative overflow-hidden min-h-screen max-w-screen`;
export const globalStyles = css`
	#__next {
		${nextDivStyles};

		padding: env(safe-area-inset-top) env(safe-area-inset-right)
			env(safe-area-inset-bottom) env(safe-area-inset-left);
	}
`;

export const xwindGlobalStyles = xw`XWIND_BASE XWIND_GLOBAL`;
