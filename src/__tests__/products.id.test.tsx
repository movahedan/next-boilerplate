import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { mockUseRouter } from '__tests__/__helpers__/router.test';
import ProductPage, {
	getStaticPaths,
	getStaticProps,
} from 'pages/products/[id]';

import type { InferGetStaticPropsType } from 'next';

mockUseRouter({
	query: {
		id: '1',
	},
});

describe('<ProductPage>', () => {
	const defaultProps: InferGetStaticPropsType<typeof getStaticProps> = {
		data: {
			id: 0,
			updatedCount: 1,
		},
	};

	it('should match snapshot', async () => {
		const component = create(<ProductPage {...defaultProps} />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ProductPage {...defaultProps} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	it('should have getStaticPaths', async () => {
		const results = await getStaticPaths({});
		expect(results).toEqual({
			paths: ids.map((id) => ({
				params: { id: String(id) },
			})),
			fallback: false,
		});
	});

	it('should have getStaticProps', async () => {
		const context = {
			params: {
				id: '1',
			},
		};

		const results = await getStaticProps(context);
		expect(results).toEqual({
			revalidate: 1,
			props: {
				data: {
					id: 1,
					updatedCount: 1,
				},
			},
		});
	});
});
