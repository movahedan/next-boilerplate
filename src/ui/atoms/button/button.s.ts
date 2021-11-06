import { css } from '@emotion/css';
import xw from 'xwind';

const buttonSubStyle = {
	base: xw`
		relative inline-block items-center justify-center align-middle 
		break-words font-bold text-center text-white 
		pointer-events-auto cursor-pointer 
		outline-none appearance-none select-none

		disabled:cursor-not-allowed disabled:opacity-25
	`,
	beforeAfter: xw`rounded-full`,
	hover: xw`ease-in top-0 bottom-0 left-0 right-0`,
	before: xw`
		block w-full h-full overflow-hidden 
		absolute left-0 top-0
	`,
	after: xw`
		absolute top-1 bottom-1 right-1 left-1
		transform-gpu ease-out duration-100
		block overflow-hidden
	`,
	active: xw`
		absolute top-1 bottom-1 right-1 left-1
	`,
	sizeVariant: {
		small: xw`py-2 px-6`,
		medium: xw`py-3 px-8`,
		large: xw`py-4 px-12`,
	},
};

export const buttonStyles = css`
	${buttonSubStyle.base};

	&.small {
		${buttonSubStyle.sizeVariant.small};
	}
	&.medium {
		${buttonSubStyle.sizeVariant.medium};
	}
	&.large {
		${buttonSubStyle.sizeVariant.large};
	}

	&:hover:not(:disabled):after {
		${buttonSubStyle.hover};
	}

	&:before,
	&:after {
		${buttonSubStyle.beforeAfter};
	}

	&:before {
		${buttonSubStyle.before};

		content: '';
		z-index: -2;
	}

	&:after {
		${buttonSubStyle.after};

		content: '';
		background-image: linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
		z-index: -1;
	}

	&:active:not(:disabled) {
		color: #ccc;
	}

	&:active:not(:disabled):after {
		${buttonSubStyle.active};

		background-image: linear-gradient(
				0deg,
				rgba(0, 0, 0, 0.2),
				rgba(0, 0, 0, 0.2)
			),
			linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
	}

	&:focus:not(:active):not(:hover):before {
		background-color: rgba(249, 58, 19, 0.32);
	}
`;
