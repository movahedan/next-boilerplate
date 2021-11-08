import type { LayoutDeclaration } from './layout';
import type { NextPage } from 'next';

declare module 'next' {
	declare type NextPageWithLayout<
		Props = undefined,
		LayoutProps = undefined
	> = NextPage<Props> & {
		Layout?: LayoutDeclaration<LayoutProps>;
	};

	declare function declaredGlobalGetServerSideProps<
		Props = unknown,
		Query extends ParsedUrlQuery = ParsedUrlQuery,
		PreviewData = unknown
	>(
		getServerSideProps: GetServerSideProps<Props, Query, PreviewData>,
		options?: {
			cache?: boolean;
		}
	): GetServerSideProps<Props, Query, PreviewData>;

	type GlobalGetServerSideProps = typeof declaredGlobalGetServerSideProps;
}
