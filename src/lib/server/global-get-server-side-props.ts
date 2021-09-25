// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { attachBrowserServerSideData } from 'lib/browser';
import { dbConnect } from 'lib/db';

import type { BrowserObject } from 'lib/browser/browser.context';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export function globalGetServerSideProps<
	Props = unknown,
	Query = ParsedUrlQuery
>(
	getServerSideProps: GetServerSideProps<Props, Query>
): GetServerSideProps<Props & BrowserObject, Query> {
	return async (ctx) => {
		await dbConnect();

		return {
			props: {
				...attachBrowserServerSideData(ctx.req),
				...(await getServerSideProps(ctx)).props,
			},
		};
	};
}
