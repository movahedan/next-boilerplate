import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer';

import { mockUseRouter } from '__tests__/__helpers__/router.test';
import ProductsPage, { getStaticProps } from 'pages/products/index';

import type { InferGetStaticPropsType } from 'next';

mockUseRouter();

describe('<ProductsPage>', () => {
	const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const defaultProps: InferGetStaticPropsType<typeof getStaticProps> = {
		data: {
			ids,
		},
	};

	it('should match snapshot', async () => {
		const component = create(<ProductsPage {...defaultProps} />).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(<ProductsPage {...defaultProps} />);

		let results;
		await act(async () => {
			results = await axe(container);
		});
		expect(results).toHaveNoViolations();
	});

	it('should have getStaticProps', async () => {
		const results = await getStaticProps({});

		expect(results).toEqual({
			props: {
				data: {
					ids: [...ids, ids.length + 1],
				},
			},
			revalidate: 1,
		});
	});
});
