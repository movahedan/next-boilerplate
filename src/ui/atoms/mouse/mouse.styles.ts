import { css } from '@emotion/css';
import xw from 'xwind';

const mouseClassNames = {
	base: xw`absolute top-0 left-0 z-10 pointer-events-none`,
	theme: xw`w-72px h-72px bg-mouse opacity-75 border-mouse border-3px rounded-full`,
	animation: xw`transition-all duration-100 ease-out motion-reduce:transform-none`,
};

export const mouseStyles = css`
	${mouseClassNames.base};
	${mouseClassNames.theme};
	${mouseClassNames.animation};
`;
