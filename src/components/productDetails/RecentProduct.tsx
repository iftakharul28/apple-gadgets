import { api } from "@/utils/api";
import { Card } from "@/components";

const RecentProduct = () => {
  const { data: products } = api.product.getRecrentProduct.useQuery();
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
