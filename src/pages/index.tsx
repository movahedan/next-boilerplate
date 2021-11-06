import { css } from '@emotion/css';
import { NextSeo } from 'next-seo';

import { globalGetServerSideProps } from 'lib/utils';

import { websiteBaseUrl } from 'constants/seo';

import type { NextPageWithLayout } from 'next';

interface Props {
	data: {
		message: string;
	};
}

const basicStyles = css`
	color: cornflowerblue;
	border: 1px solid lightgreen;
	border-right: none;
	border-bottom: none;
	box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
	transition: all 0.1s linear;
	margin: 3rem 0;
	padding: 1rem 0.5rem;
`;

const IndexPage: NextPageWithLayout<Props> = ({ data: { message } }) => (
	<>
		<NextSeo canonical={`${websiteBaseUrl}/`} />
		<h1>{message}</h1>
		<div className={basicStyles}>Basic styles using emotion</div>
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
