import { css } from '@emotion/css';
import xw from 'xwind';

const wrapperClassNames = xw`fixed top-0 right-0 z-0 flex h-screen`;
export const wrapperStyles = css`
	${wrapperClassNames}
`;

const scrollbarClassNames = {
	active: xw`rounded-full`,
	base: xw`relative w-3 md:w-4 my-auto h-70vh`,
	theme: xw`rounded-full rounded-tr-none rounded-br-none bg-white-opacity-10`,
};
export const scrollbarStyles = css`
	${scrollbarClassNames.base};
	${scrollbarClassNames.theme};

	&.active {
		${scrollbarClassNames.active};
	}
`;

const thumbClassNames = xw`absolute top-0 right-0 z-0 w-12`;
export const thumbStyles = css`
	${thumbClassNames};
`;

const thumbInnerClassNames = {
	active: xw`rounded-full`,
	base: xw`absolute top-0 right-0 z-0 h-full w-3 md:w-4`,
	theme: xw`bg-blue border-mouse rounded-full rounded-tr-none rounded-br-none`,
	animation: xw`transition-all duration-300 ease-out motion-reduce:transform-none`,
};
export const innerThumbStyles = css`
	${thumbInnerClassNames.base};
	${thumbInnerClassNames.theme};
	${thumbInnerClassNames.animation};

	&.active {
		${thumbInnerClassNames.active};
	}
`;
