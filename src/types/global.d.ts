/* eslint-disable import/no-default-export */
import 'node';
import type { NextPage } from 'next';
import type { AppProps, AppPropsType } from 'next/app';
import type { FC, CSSProperties } from 'react';

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module 'next' {
	declare type NextPageWithLayout<P = undefined, L = undefined> =
		NextPage<P> & {
			Layout?: {
				Component: LayoutComponent<L>;
				props?: LayoutProps<L> | ((pageProps: P) => LayoutProps<L>);
			};
		};
}

declare module 'next/app' {
	declare type AppWithLayoutProps<P = undefined, L = undefined> = Omit<
		AppProps<P>,
		'Component'
	> & {
		Component: AppPropsType['Component'] & {
			Layout?: {
				Component: LayoutComponent<L>;
				props?: LayoutProps<L> | ((pageProps: P) => LayoutProps<L>);
			};
		};
	};
}

declare module '*.scss' {
	const content: Record<string, string>;
	export default content;
}

type LayoutProps<L> = L extends Record<string, unknown>
	? L & {
			style?: CSSProperties;
			className?: string;
	  }
	: {
			style?: CSSProperties;
			className?: string;
	  };

type LayoutComponent<L> = L extends Record<string, unknown>
	? FC<LayoutProps<L>>
	: undefined;
