import { attachBrowserServerSideData } from 'lib/browser';
import { axiosModule } from 'lib/utils';

import { cacheThisServerSideProps } from './cache-this-server-side-props';

import type { BrowserObject } from 'lib/browser';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export function globalGetServerSideProps<
	Props = unknown,
	Query extends ParsedUrlQuery = ParsedUrlQuery
>(
	getServerSideProps: GetServerSideProps<Props, Query>,
	options?: {
		cachable?: boolean;
	}
): GetServerSideProps<Props & BrowserObject, Query> {
	const { cachable } = options || {};

	return async (ctx) => {
		const { res } = ctx;
		if (cachable) cacheThisServerSideProps(res);
		axiosModule.config.server();

		const pageResult = await getServerSideProps(ctx);
		// @ts-expect-error Just check page is truthy or not
		if (pageResult.props) {
			return {
				...pageResult,
				props: {
					// @ts-expect-error Just check page is truthy or not
					...pageResult.props,
					...attachBrowserServerSideData(ctx.req),
				},
			};
		}

		return pageResult;
	};
}
