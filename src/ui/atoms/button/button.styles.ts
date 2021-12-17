import { css } from '@emotion/css';
import tw, { theme } from 'twin.macro';

export const buttonStyles = css`
	${tw`
		relative inline-flex items-center justify-center align-middle 
		text-white break-words text-center
		rounded-6px outline-none appearance-none disabled:opacity-25
		select-none pointer-events-auto
		cursor-pointer disabled:cursor-not-allowed
	`}

	&.small {
		${tw`py-2 px-6 prose-sm`};
	}
	&.medium {
		${tw`py-3 px-8 prose`};
	}
	&.large {
		${tw`py-6 px-12 prose-heading-xl`};
	}

	&.primary {
		background: linear-gradient(
			91.52deg,
			${theme`colors.blue-opacity-80`} 0.13%,
			${theme`colors.yellow-opacity-80`} 100%
		);
	}

	&:hover:not(:disabled):after {
		${tw`ease-in top-0 bottom-0 left-0 right-0`};
	}

	&:before,
	&:after {
		${tw`rounded-full`};
	}

	&:before {
		${tw`block w-full h-full overflow-hidden absolute left-0 top-0`};

		content: '';
		z-index: -2;
	}

	&:after {
		${tw`
			absolute top-1 bottom-1 right-1 left-1
			transform-gpu ease-out duration-100
			block overflow-hidden
		`};

		content: '';
		z-index: -1;
	}

	&:active:not(:disabled):after {
		${tw`
		absolute top-1 bottom-1 right-1 left-1
	`};
	}
`;
