import { useSearchParams } from "next/navigation";
import { api } from "@/utils/api";
import { Layout } from "@/layout/index";
import { DetailsSkeleton, ProductAction, RecentProduct } from "@/components";

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
    return <DetailsSkeleton />;
  }
  if (isError) {
    return <p>error</p>;
  }
  return (
    <Layout title={product?.title || ""}>
      <section className="product">
        <div className="container">
          <ProductAction product={product} />
          <RecentProduct />
        </div>
      </section>
    </Layout>
  );
};

export default PostSingle;
