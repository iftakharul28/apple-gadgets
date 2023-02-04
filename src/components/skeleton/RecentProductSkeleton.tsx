import { data } from "@/data/demo";
import { CardSkeleton } from "@/components";

const RecentProductSkeleton = () => {
  return (
    <div className="product__recent">
      <div className="product__recent-wrapper scrollbar-hidden">
        {data?.slice(0, 8).map(({ id }) => (
          <CardSkeleton key={id} />
        ))}
      </div>
    </div>
  );
};

export default RecentProductSkeleton;
