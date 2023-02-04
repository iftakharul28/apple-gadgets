import { api } from "@/utils/api";
import { Card, RecentProductSkeleton } from "@/components";

const RecentProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.getRecrentProduct.useQuery();
  if (isLoading) {
    return <RecentProductSkeleton />;
  }
  if (isError) {
    return <p>error</p>;
  }
  return (
    <div className="product__recent">
      <div className="product__recent-wrapper scrollbar-hidden">
        {products?.map((item, i: number) => (
          <Card {...item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;
