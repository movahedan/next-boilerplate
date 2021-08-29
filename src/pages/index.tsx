import { BaseLayout, GButton } from 'ui';

import type { NextPageWithLayout, GetServerSideProps } from 'next';

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
		<GButton />
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	return {
		props: {
			data: {
				message: 'Message from getServerSideProps',
			},
		},
	};
};

export default IndexPage;
