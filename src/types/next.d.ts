import type { LayoutComponent, LayoutProps } from './layout';
import type { NextPage } from 'next';

declare module 'next' {
	declare type NextPageWithLayout<P = undefined, L = undefined> =
		NextPage<P> & {
			Layout?: {
				Component?: LayoutComponent<L>;
				props?: LayoutProps<L> | ((pageProps: P) => LayoutProps<L>);
			};
		};
}
