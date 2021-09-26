// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { attachBrowserServerSideData } from 'lib/browser';

import type { BrowserObject } from 'lib/browser';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export function globalGetServerSideProps<
	Props = unknown,
	Query = ParsedUrlQuery
>(
	getServerSideProps: GetServerSideProps<Props, Query>
): GetServerSideProps<Props & BrowserObject, Query> {
	return async (ctx) => {
		const pageResult = await getServerSideProps(ctx);

		if (pageResult.props) {
			return {
				...pageResult,
				props: {
					...pageResult.props,
					...attachBrowserServerSideData(ctx.req),
				},
			};
		}

		return pageResult;
	};
}
