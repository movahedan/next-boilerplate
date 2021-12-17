import { css } from '@emotion/react';
import tw from 'twin.macro';

export const globalStyles = css`
	#__next {
		${tw`relative overflow-hidden min-h-screen max-w-screen`};

		padding: env(safe-area-inset-top) env(safe-area-inset-right)
			env(safe-area-inset-bottom) env(safe-area-inset-left);
	}
`;
