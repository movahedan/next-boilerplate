import { NextSeo } from 'next-seo';

import { globalGetServerSideProps } from 'lib/server';

import { websiteBaseUrl } from 'constants/seo';

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
		cache: true,
	}
);

export default IndexPage;
