import { useSearchParams } from "next/navigation";
import { api } from "@/utils/api";
import { Layout } from "@/layout/index";
import { ProductAction } from "@/components";

const PostSingle = () => {
  const searchParams = useSearchParams();
  const {
    data: product,
    isLoading,
    isError,
  } = api.product.getDetailsProduct.useQuery({
    id: `${searchParams.get("slug")}`,
  });
  if (isLoading) {
    return <p>loading</p>;
  }
  if (isError) {
    return <p>error</p>;
  }
  return (
    <Layout title={product?.title || ""} description={product?.title || ""}>
      <article className="product">
        <div className="container">
          <ProductAction product={product} />
        </div>
      </article>
    </Layout>
  );
};

export default PostSingle;
