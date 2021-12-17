import { css } from '@emotion/css';
import tw from 'twin.macro';

const buttonSubStyle = {
	base: tw`
		relative inline-flex items-center justify-center align-middle 
		text-white break-words text-center
		rounded-6px outline-none appearance-none disabled:opacity-25
		select-none pointer-events-auto
		cursor-pointer disabled:cursor-not-allowed
	`,

	beforeAfter: tw`rounded-full`,
	hover: tw`ease-in top-0 bottom-0 left-0 right-0`,
	before: tw`
		block w-full h-full overflow-hidden 
		absolute left-0 top-0
	`,
	after: tw`
		absolute top-1 bottom-1 right-1 left-1
		transform-gpu ease-out duration-100
		block overflow-hidden
	`,
	active: tw`
		absolute top-1 bottom-1 right-1 left-1
	`,
	colorVariant: {
		primary: tw``,
		outline: tw``,
	},
	sizeVariant: {
		small: tw`py-2 px-6 prose-sm`,
		medium: tw`py-3 px-8 prose`,
		large: tw`py-6 px-12 prose-heading-xl`,
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

	&.outline {
		${buttonSubStyle.colorVariant.outline};
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
