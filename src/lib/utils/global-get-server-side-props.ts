import { axiosModule } from 'lib/axios';
import { withBrowserServerSideData } from 'lib/browser';

import { setCacheHeader } from './set-cache-header';

import type { GlobalGetServerSideProps } from 'next';

export const globalGetServerSideProps: GlobalGetServerSideProps =
	(getServerSideProps, { cache } = {}) =>
	async (ctx) => {
		axiosModule.config.server();
		if (cache) {
			setCacheHeader(ctx.res);
		}

		const pageResult = await getServerSideProps(ctx);
		const { props } = pageResult as any;
		if (!props) {
			return pageResult;
		}

		const finalProps = withBrowserServerSideData(props, ctx.req.headers);

		return {
			props: finalProps,
		};
	};
