import { ProductType } from "@/types";
import Link from "next/link";
const Card = ({ id, image, title, price }: ProductType) => {
  return (
    <article className="card" key={id} title={title || ""}>
      <Link className="card__wrapper" href={`/product/${id}`}>
        <figure className="card__image-wrapper">
          <img className="card__image" src={image || ""} alt={title || ""} />
        </figure>
        <h2 className="card__heading">{title}</h2>
        <p className="card__text">{price}</p>
      </Link>
    </article>
  );
};

export default Card;
