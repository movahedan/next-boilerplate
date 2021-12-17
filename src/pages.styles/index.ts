import { css, keyframes } from '@emotion/css';
import tw from 'twin.macro';

const blinkKeyframe = keyframes`
0% {
	opacity: 0;
}
49% {
	opacity: 0;
}
50% {
	opacity: 1;
}
100% {
	opacity: 1;
}
`;
export const headerSectionClassName = css`
	.intro {
		&::before {
			content: '*';
			${tw`text-yellow`};
		}
	}
	.info {
		${tw`block`};
		&::after {
			content: ' &&';
			${tw`text-blue`};
		}
	}
	.outro {
		${tw`text-mellow block`};
		&::after {
			content: ';';
			${tw`text-yellow`};
			animation-duration: 1.2s;
			animation-name: ${blinkKeyframe};
			animation-iteration-count: infinite;
		}
	}
	.name {
		&::before {
			content: '<';
			${tw`text-blue`};
		}
		&::after {
			content: '>';
			${tw`text-blue`};
		}
	}
`;

export const jobsSectionClassName = css`
	& > li {
		${tw`max-w-4xl`};
		&.blue {
			${tw`lg:max-w-4xl`};
		}
		&.yellow {
			${tw`lg:w-480px`};
		}

		section {
			${tw`p-10`};
		}
	}
`;
