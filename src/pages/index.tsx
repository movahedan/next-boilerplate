import { globalGetServerSideProps } from 'lib/server';

import type { NextPage } from 'next';

interface Props {
	data: {
		message: string;
	};
}

const IndexPage: NextPage<Props> = ({ data: { message } }) => (
	<>
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
