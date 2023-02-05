import { useState } from "react";

const ProductDescription = ({
  description,
}: {
  description?: string | null;
}) => {
  const [seleted, setSelected] = useState<string>("description");
  return (
    <section className="product__description">
      <div className="product__description-button-wrapper">
        <button
          className={
            seleted === "description"
              ? "product__description-button product__description-button--active"
              : "product__description-button"
          }
          type="button"
          onClick={() => setSelected("description")}>
          Description
        </button>
        <button
          className={
            seleted === "specification"
              ? "product__description-button product__description-button--active"
              : "product__description-button"
          }
          type="button"
          onClick={() => setSelected("specification")}>
          Specification
        </button>
        <button
          className={
            seleted === "video"
              ? "product__description-button product__description-button--active"
              : "product__description-button"
          }
          type="button"
          onClick={() => setSelected("video")}>
          Video
        </button>
        <button
          className={
            seleted === "warranty"
              ? "product__description-button product__description-button--active"
              : "product__description-button"
          }
          type="button"
          onClick={() => setSelected("warranty")}>
          Warranty
        </button>
      </div>
      <div className="product__description-content-wrapper">
        <div
          className="product__content"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </div>
    </section>
  );
};

export default ProductDescription;
