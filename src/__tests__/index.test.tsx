import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import Homepage from 'pages/index';

// import type { GetServerSidePropsContext } from 'next';

describe('<Homepage>', () => {
	it('should match snapshot', async () => {
		const component = create(
			<Homepage data={{ message: 'Message from getServerSideProps' }} />
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(
			<Homepage data={{ message: 'Message from getServerSideProps' }} />
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	// it('should call the api and return product', async () => {
	// 	const context = { req: { headers: {} }, res: {} };
	// 	const response = await getServerSideProps(
	// 		context as GetServerSidePropsContext
	// 	);
	// 	expect(response).toEqual(
	// 		expect.objectContaining({
	// 			props: {
	// 				// @ts-ignore
	// 				...attachBrowserServerSideData(context.req),
	// 				data: {
	// 					message: 'Message from getServerSideProps',
	// 				},
	// 			},
	// 		})
	// 	);
	// });
});
