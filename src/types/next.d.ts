import type { LayoutDeclaration, LayoutDeclaration } from './layout';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { AppPropsType } from 'next/dist/shared/lib/utils';

declare module 'next' {
	declare type NextPageWithLayout<
		Props = undefined,
		LayoutProps = undefined
	> = NextPage<Props> & {
		Layout?: LayoutDeclaration<LayoutProps>;
	};
}

declare module 'next/app' {
	declare type AppWithLayoutProps<P = undefined, L = undefined> = Omit<
		AppProps<P>,
		'Component'
	> & {
		Component: AppPropsType['Component'] & {
			Layout?: LayoutDeclaration<L>;
		};
	};
}
