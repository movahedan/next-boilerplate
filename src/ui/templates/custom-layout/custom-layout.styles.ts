import { css as globalCss } from '@emotion/react';
import xw from 'xwind';

const nextElementStyle = xw`relative bg-dark text-white`;
const bgSvgStyle = xw`fixed w-screen h-screen pointer-events-none top-0 z-10`;

export const customLayoutGlobalStyles = globalCss`
	::-webkit-scrollbar {
		width: 0px;
	}

	#__next {
    ${nextElementStyle};

		> svg.custom-layout-bg {
			${bgSvgStyle}
		}
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
