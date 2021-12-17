import { css } from '@emotion/react';
import tw from 'twin.macro';

export const customLayoutGlobalStyles = css`
	::-webkit-scrollbar {
		width: 0px;
	}

	#__next {
		${tw`relative bg-dark text-white`}

		> svg.custom-layout-bg {
			${tw`fixed w-screen h-screen pointer-events-none top-0 z-10`}
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
