import Link from 'next/link';
import css from 'styled-jsx/css';

import type { FC } from 'react';

export const BaseLayout: FC = ({ children }) => (
	<>
		<style jsx global>
			{globalCSS}
		</style>

		<style jsx>{navbarCSS}</style>
		<nav>
			<Link href='/'>
				<a>Go to home</a>
			</Link>
			<Link href='/react-query/client-side'>
				<a>Go to /react-query</a>
			</Link>
			<Link href='/react-query/static-props'>
				<a>Go to /react-query/static-props</a>
			</Link>
		</nav>

		{children}
	</>
);

const navbarCSS = css`
	nav {
		@apply p-3 text-white bg-black;

		a {
			@apply p-3 mr-6;
		}
	}
`;

const globalCSS = css.global`
	*:not(i) {
		font-family: Inter sans-serif;
	}

	:global(#__next) {
		@apply relative flex flex-col min-h-screen m-0 overflow-hidden text-base max-w-screen;

		padding: env(safe-area-inset-top) env(safe-area-inset-right)
			env(safe-area-inset-bottom) env(safe-area-inset-left);
	}
`;
