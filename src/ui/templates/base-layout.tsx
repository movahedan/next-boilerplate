import Link from 'next/link';
import css from 'styled-jsx/css';

import type { FC, CSSProperties } from 'react';

export const BaseLayout: FC<{ style?: CSSProperties; className?: string }> = ({
	style,
	className,
	children,
}) => (
	<>
		<style jsx global>
			{globalCSS}
		</style>

		<style jsx>{navbarCSS}</style>
		<nav>
			<Link href='/'>
				<a>Go to home</a>
			</Link>
			<Link href='/pets'>
				<a>See Pets!</a>
			</Link>
			<Link href='/react-query/client-side'>
				<a>Go to /react-query</a>
			</Link>
			<Link href='/react-query/static-props'>
				<a>Go to /react-query/static-props</a>
			</Link>
		</nav>

		<main style={style} className={className}>
			{children}
		</main>
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

// eslint-disable-next-line import/no-named-as-default-member
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
