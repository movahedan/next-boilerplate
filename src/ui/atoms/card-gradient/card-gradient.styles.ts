import { css } from '@emotion/css';
import tw from 'twin.macro';

import { tailwindTheme } from 'lib/utils';

const border = {
	blueGradient: `linear-gradient(134.14deg, ${tailwindTheme.theme.colors.blue} 0%, ${tailwindTheme.theme.colors['white-opacity-10']} 25.6%)`,
	blueHoverClassName: tw`hover:bg-blue`,
	yellowGradient: `linear-gradient(146.28deg, ${tailwindTheme.theme.colors.yellow} 0%, ${tailwindTheme.theme.colors['white-opacity-10']} 25.6%)`,
	yellowHoverClassName: tw`hover:bg-yellow`,
};

const background = {
	blue: `linear-gradient(130.76deg, ${tailwindTheme.theme.colors['blue-opacity-10']} 0%, transparent 50.03%), linear-gradient(0deg, ${tailwindTheme.theme.colors['white-opacity-10']}, ${tailwindTheme.theme.colors['white-opacity-10']})`,
	yellow: `linear-gradient(137.94deg, ${tailwindTheme.theme.colors['yellow-opacity-10']} 0%, transparent 30.89%), linear-gradient(0deg, ${tailwindTheme.theme.colors['white-opacity-10']}, ${tailwindTheme.theme.colors['white-opacity-10']})`,
};

const wrapperBase = tw`p-2px rounded-20px transition-colors ease-in-out duration-500`;
export const wrapperClassName = css`
	${wrapperBase}

	&.blue {
		background: ${border.blueGradient};
		${border.blueHoverClassName}
	}
	&.yellow {
		background: ${border.yellowGradient};
		${border.yellowHoverClassName}
	}
`;

const containerBase = tw`bg-white-opacity-10 rounded-20px h-full`;
export const containerClassName = css`
	${containerBase};

	&.blue {
		background: ${background.blue};
	}
	&.yellow {
		background: ${background.yellow};
	}
`;