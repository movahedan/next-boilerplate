import type { LayoutDeclaration } from './layout';
import type { AppProps } from 'next/app';
import type { AppPropsType } from 'next/dist/shared/lib/utils';

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
