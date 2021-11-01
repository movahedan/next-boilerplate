import type { NextPage } from 'next';

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => (
	<p>
		{statusCode
			? `An error ${statusCode} occurred on server`
			: 'An error occurred on client'}
	</p>
);

Error.getInitialProps = ({ res }) => {
	const statusCode = res?.statusCode;

	return { statusCode };
};

export default Error;
