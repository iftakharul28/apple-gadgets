import { data } from "@/data/demo";
import { CardSkeleton } from "@/components";

const HomeSkeleton = () => {
  return (
    <section className="home">
      <div className="container">
        <div className="home__products">
          {data?.map(({ id }) => (
            <CardSkeleton key={id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSkeleton;
