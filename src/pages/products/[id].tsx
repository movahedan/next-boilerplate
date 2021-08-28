import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

interface IProductsPage {
  data?: {
    id: number;
    updatedCount: number;
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const paths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => ({
    params: { id: String(id) },
  }));

  return { paths, fallback: true };
};

let updatedCount = 0;
export const getStaticProps: GetStaticProps<IProductsPage> = async ({
  params: { id } = {},
}) => {
  return new Promise((res) => {
    ++updatedCount;
    setTimeout(() => {
      res({
        revalidate: 1, // In seconds
        props: {
          data: {
            id: Number(id),
            updatedCount,
          },
        },
      });
    }, 300);
  });
};

const ProductsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ data }) => {
    const router = useRouter();
    const { id, updatedCount } = data || {};

    return (
      <div>
        <h1>Product page</h1>
        {router.isFallback ? (
          <span>Loading...</span>
        ) : (
          <>
            <p>You&apos;re seeing an static page.</p>
            <p>product id: {id}</p>
            <p>update count of product id: {updatedCount}</p>
          </>
        )}
      </div>
    );
  };

export default ProductsPage;
