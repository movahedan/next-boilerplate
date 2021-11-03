import { attachBrowserServerSideData } from 'lib/browser';

import { axiosModule } from './axios';
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
		cache?: boolean;
	}
): GetServerSideProps<Props & BrowserObject, Query> {
	const { cache } = options || {};

	return async (ctx) => {
		const {
			res,
			req: { headers },
		} = ctx;

		axiosModule.config.server();
		if (cache) {
			cacheThisServerSideProps(res);
		}

		const pageResult = await getServerSideProps(ctx);
		// @ts-expect-error Just check page is truthy or not
		if (pageResult.props) {
			return {
				...pageResult,
				props: {
					// @ts-expect-error Just check page is truthy or not
					...pageResult.props,
					...attachBrowserServerSideData(headers),
				},
			};
		}

		return pageResult;
	};
}
