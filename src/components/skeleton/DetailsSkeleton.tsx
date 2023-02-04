import { data } from "@/data/demo";
import { RecentProductSkeleton } from "@/components";

const DetailsSkeleton = () => {
  return (
    <section className="product">
      <div className="container">
        <div className="product__main">
          <div className="product__image-wrapper skeleton__image-wrapper--secondery">
            <div className="skeleton__image skeleton__image--secondery"></div>
          </div>
          <div className="product__details-wrapper">
            <h1 className="product__heading skeleton__heading"></h1>
            <div className="product__details-card-wrapper">
              {data?.slice(0, 3).map(({ id }) => (
                <div className="skeleton__text" key={id}></div>
              ))}
            </div>
            <div className="product__storage-wrapper">
              <p>storage:</p>
              {data?.slice(0, 3).map(({ id }) => (
                <div key={id} role="button" className="skeleton__text"></div>
              ))}
            </div>
            <div className="product__color-wrapper">
              <p>color:</p>
              {data?.slice(0, 3).map(({ id }) => (
                <div
                  key={id}
                  role="button"
                  className="product__color skeleton__text"></div>
              ))}
            </div>
            <div className="product__account">
              <div className="skeleton__text"></div>
              <div className="skeleton__text"></div>
              <div className="skeleton__text"></div>
            </div>
          </div>
        </div>
        <RecentProductSkeleton />
      </div>
    </section>
  );
};

export default DetailsSkeleton;
