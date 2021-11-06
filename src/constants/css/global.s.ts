import { css } from '@emotion/react';
import xw from 'xwind';

const nextDivStyles = xw`relative overflow-hidden min-h-screen max-w-screen m-0 p-0`;
export const globalStyles = css`
	#__next {
		${nextDivStyles};

		padding: env(safe-area-inset-top) env(safe-area-inset-right)
			env(safe-area-inset-bottom) env(safe-area-inset-left);
	}
`;

export const xwindGlobalStyles = xw`XWIND_BASE XWIND_GLOBAL`;

// const fontOvverridesCSS = global`
//   h1, h2 {
//     font-family: 'Roboto', sans-serif;
//     @apply font-normal text-36px leading-42px uppercase;
//     @apply text-primary-default;
//     @apply max-w-640px;

//     letter-spacing: 0.48em;
//   }

//   h3 {
//     font-family: 'Roboto', sans-serif;
//     @apply font-normal text-24px leading-28px;
//     @apply text-primary-default;
//     @apply max-w-640px;
//   }

//   p,
//   span,
//   button,
//   a,
//   li,
//   h4,
//   h5,
//   h6 {
//     font-family: 'Roboto', sans-serif;
//     @apply font-normal text-14px leading-24px ;
//     @apply text-primary-default text-center;
//     @apply max-w-640px;
//   }
// `;
