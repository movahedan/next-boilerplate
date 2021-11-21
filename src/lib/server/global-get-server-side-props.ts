import { withMediaQueriesServerSideData } from 'lib/media-queries';

import { fetcherConfig } from 'entry/configs';

import { setCacheHeader } from './set-cache-header';

import type { GlobalGetServerSideProps } from 'next';

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
