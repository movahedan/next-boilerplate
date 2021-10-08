import { attachBrowserServerSideData } from 'lib/browser';
import { axiosModule } from 'lib/utils';

import type { BrowserObject } from 'lib/browser';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export function globalGetServerSideProps<
	Props = unknown,
	Query extends ParsedUrlQuery = ParsedUrlQuery
>(
	getServerSideProps: GetServerSideProps<Props, Query>
): GetServerSideProps<Props & BrowserObject, Query> {
	return async (ctx) => {
		const { req, res, resolvedUrl } = ctx;
		axiosModule.config.server({
			req,
			res,
			asPath: resolvedUrl,
		});

		const pageResult = await getServerSideProps(ctx);

		// @ts-ignore
		if (pageResult.props) {
			return {
				...pageResult,
				props: {
					// @ts-ignore
					...pageResult.props,
					...attachBrowserServerSideData(ctx.req),
				},
			};
		}

		return pageResult;
	};
}
