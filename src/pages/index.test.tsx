import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { GetServerSidePropsContext } from 'next';
import { create } from 'react-test-renderer';

import Homepage, { getServerSideProps } from './index';

describe('<Homepage>', () => {
	it('should match snapshot', async () => {
		const component = create(
			<Homepage data={{ message: 'Message from getServerSideProps' }} />
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('accessibility', async () => {
		const { container } = render(
			<Homepage data={{ message: 'Message from getServerSideProps' }} />
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should call the api and return product', async () => {
		const context = {};
		const response = await getServerSideProps(
			context as GetServerSidePropsContext
		);
		expect(response).toEqual(
			expect.objectContaining({
				props: {
					data: {
						message: 'Message from getServerSideProps',
					},
				},
			})
		);
	});
});
