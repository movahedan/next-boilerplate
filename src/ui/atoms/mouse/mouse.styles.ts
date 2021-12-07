import { css } from '@emotion/css';
import xw from 'xwind';

const mouseStyles = {
	base: xw`absolute top-0 left-0 z-10 pointer-events-none`,
	theme: xw`w-72px h-72px bg-mouse opacity-75 border-mouse border-3px rounded-full`,
	animation: xw`transition-all duration-100 ease-out motion-reduce:transform-none`,
};

export const mouseClassName = css`
	${mouseStyles.base};
	${mouseStyles.theme};
	${mouseStyles.animation};
`;

const wrapperStyles = xw`fixed top-0 bottom-0 left-0 right-0 z-10 h-screen pointer-events-none`;
export const wrapperClassName = css`
	${wrapperStyles}
`;
