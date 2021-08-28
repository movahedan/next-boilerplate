import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

interface IProductsPage {
	data: {
		ids: number[];
	};
}

let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const getStaticProps: GetStaticProps<IProductsPage> = async () => {
	ids = [...ids, ids.length + 1];

	return {
		revalidate: 1,
		props: { data: { ids } },
	};
};

const ProductsPage: NextPage<IProductsPage> = ({ data: { ids } }) => (
	<div>
		<h1>Produtcs page</h1>
		<ul>
			{ids.map((id) => (
				<li key={id}>
					<Link href={`/products/${id}`}>
						<a>{id}</a>
					</Link>
				</li>
			))}
		</ul>
	</div>
);

export default ProductsPage;
