import { NextSeo } from 'next-seo';

import { websiteBaseUrl } from 'lib/constants';
import { globalGetServerSideProps } from 'lib/server';

import type { NextPageWithLayout } from 'next';

interface Props {
	data: {
		message: string;
	};
}

const IndexPage: NextPageWithLayout<Props> = ({ data: { message } }) => (
	<>
		<NextSeo canonical={`${websiteBaseUrl}/`} />
		<h1>{message}</h1>
	</>
);

export const getServerSideProps = globalGetServerSideProps<Props>(
	async () => ({
		props: {
			data: {
				message: 'Message from getServerSideProps',
			},
		},
	}),
	{
		cachable: true,
	}
);

export default IndexPage;
