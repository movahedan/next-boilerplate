import { setCacheHeader } from 'lib/server';

import { fetcherConfig } from 'entry/configs';

import { withMediaQueriesServerSideData } from 'ui/media-queries';

import type { GetServerSideProps, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type GlobalGetServerSideProps = <
	Props = unknown,
	Query extends ParsedUrlQuery = ParsedUrlQuery,
	PreviewDataType extends PreviewData = PreviewData
>(
	getServerSideProps: GetServerSideProps<Props, Query, PreviewDataType>,
	options?: {
		cache?: boolean;
	}
) => GetServerSideProps<Props, Query, PreviewDataType>;

export const globalGetServerSideProps: GlobalGetServerSideProps =
	(getServerSideProps, { cache } = {}) =>
	async (ctx) => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		fetcherConfig(() => {}, ctx.req, ctx.res);

		if (cache) {
			setCacheHeader(ctx.res);
		}

		const pageResult = await getServerSideProps(ctx);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { props } = pageResult as any;
		if (!props) {
			return pageResult;
		}

		const finalProps = withMediaQueriesServerSideData(props, ctx.req.headers);

		return {
			props: finalProps,
		};
	};
