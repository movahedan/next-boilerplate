import type {
	NextPage,
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from 'next';

interface IProductsPage {
	data: {
		id: number;
		updatedCount: number;
	};
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => ({
	paths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => ({
		params: { id: String(id) },
	})),
	fallback: false,
});

let updatedCount = 0;
export const getStaticProps: GetStaticProps<IProductsPage> = async ({
	params: { id } = {},
}) => {
	++updatedCount;

	return {
		revalidate: 1, // In seconds
		props: {
			data: {
				id: Number(id),
				updatedCount,
			},
		},
	};
};

const ProductPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	data: { id, updatedCount },
}) => (
	<div>
		<h1>Product page</h1>
		<p>You&apos;re seeing an static page.</p>
		<p>product id: {id}</p>
		<p>update count of product id: {updatedCount}</p>
	</div>
);

export default ProductPage;
