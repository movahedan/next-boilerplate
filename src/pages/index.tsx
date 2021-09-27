import { cacheThisServerSideProps, globalGetServerSideProps } from 'lib/server';

import { BaseLayout } from 'ui';

import type { NextPageWithLayout } from 'next';

interface Props {
	data: {
		message: string;
	};
}

const IndexPage: NextPageWithLayout<Props, { yo: string }> = ({
	data: { message },
}) => (
	<>
		<h1>{message}</h1>
	</>
);

IndexPage.Layout = {
	Component: BaseLayout,
	props: ({ data: { message } }) => {
		if (message == 'yo') {
			return {
				yo: 'yo',
			};
		} else {
			return {
				yo: 'no',
				style: {
					display: 'block',
				},
			};
		}
	},
};

export const getServerSideProps = globalGetServerSideProps<Props>(
	async (ctx) => {
		cacheThisServerSideProps(ctx.res);

		return {
			props: {
				data: {
					message: 'Message from getServerSideProps',
				},
			},
		};
	}
);

export default IndexPage;
