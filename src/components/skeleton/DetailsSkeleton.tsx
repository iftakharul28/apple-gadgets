import { data } from "@/data/demo";
import RecentProductSkeleton from "./RecentProductSkeleton";

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
              {data?.map(({ id }) => (
                <div
                  key={id}
                  role="button"
                  className="product__color skeleton__text"></div>
              ))}
            </div>
            <div className="product__account">
              <div className="product__actions-wrapper">
                <button className="product__action">-</button>
                <label className="visually-hidden" htmlFor="add">
                  add
                </label>
                <input
                  className="product__action-input"
                  type="number"
                  name="add"
                  id="add"
                />
                <button className="product__action">+</button>
              </div>
              <button
                type="button"
                className="product__button product__button--secondey">
                Buy Now
              </button>
              <button type="button" className="product__button">
                Add to card
              </button>
            </div>
          </div>
        </div>
        <RecentProductSkeleton />
      </div>
    </section>
  );
};

export default DetailsSkeleton;
