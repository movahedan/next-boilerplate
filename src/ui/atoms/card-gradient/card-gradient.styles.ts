import { css } from '@emotion/css';
import tw, { theme } from 'twin.macro';

const background = {
	blue: `linear-gradient(130.76deg, ${theme`colors.blue-opacity-10`} 0%, transparent 50.03%), linear-gradient(0deg, ${theme`colors.white-opacity-10`}, ${theme`colors.white-opacity-10`})`,
	yellow: `linear-gradient(137.94deg, ${theme`colors.yellow-opacity-10`} 0%, transparent 30.89%), linear-gradient(0deg, ${theme`colors.white-opacity-10`}, ${theme`colors.white-opacity-10`})`,
};

export const wrapperClassName = css`
	${tw`p-2px rounded-20px transition-colors ease-in-out duration-500`}

	&.blue {
		${tw`hover:bg-blue`}
	}
	&.yellow {
		${tw`hover:bg-yellow`}
	}
`;

export const middleClassName = css`
	${tw`h-full bg-dark rounded-20px`}

	&.blue {
		background: ${background.blue};
	}
	&.yellow {
		background: ${background.yellow};
	}
`;

export const containerClassName = css`
	${tw`bg-white-opacity-10 rounded-20px h-full`};

	&.blue {
		background: ${background.blue};
	}
	&.yellow {
		background: ${background.yellow};
	}
`;
