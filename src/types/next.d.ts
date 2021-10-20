import type { LayoutDeclaration } from './layout';
import type { NextPage } from 'next';

declare module 'next' {
	declare type NextPageWithLayout<P = undefined, L = undefined> =
		NextPage<P> & {
			Layout?: LayoutDeclaration<L>;
		};
}
