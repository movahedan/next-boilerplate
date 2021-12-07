import { css } from '@emotion/css';
import { css as globalCss } from '@emotion/react';
import xw from 'xwind';

export const bgClassNames = xw`fixed w-screen h-screen pointer-events-none top-0 z-10`;
export const bgStyles = css`
	${bgClassNames}
`;

const globalTheme = xw`bg-dark text-white`;
export const customLayoutGlobalStyles = globalCss`
	::-webkit-scrollbar {
		width: 0px;
	}

	#__next {
    ${globalTheme};
		position: relative;
	}

	* {
		cursor: none !important;
	}

	html {
		scrollbar-width: none;
	}

	::-webkit-scrollbar {
		width: 0px;
	}
`;
