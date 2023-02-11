import { useState, type ChangeEvent } from "react";
// import { Count } from "@/components";
import { DeleteIcon } from "@/components/icons";
import { useCart } from "@/store";
import Link from "next/link";
type cartListType = {
  productId?: string;
  id?: string;
  title?: string | null;
  color?: string;
  image?: string;
  brand?: string;
  size?: string;
  storage?: string;
  price?: number;
  qty: number;
  total?: number;
};
const CardList = ({ item }: { item: cartListType }) => {
  const [addCard, setAddCard] = useState<cartListType>(item);
  const deleteCartList = useCart((state) => state?.deleteCartList);
  const deleteCart = useCart((state) => state?.deleteCart);
  // const AddToCard = (key: string, e?: ChangeEvent<HTMLInputElement>) => {
  //   console.log(key, addCard);
  //   if (key === "add") {
  //     setAddCard({
  //       ...addCard,
  //       qty: addCard?.qty ? Number(addCard?.qty) + 1 : 1,
  //     });
  //   }
  //   if (key === "update") {
  //     setAddCard({ ...addCard, qty: Number(e?.target.value) });
  //   }
  //   if (key === "remove") {
  //     setAddCard({
  //       ...addCard,
  //       qty: addCard?.qty ? addCard?.qty - 1 : 1,
  //     });
  //   }
  //   return;
  // };
  return (
    <article className="cart__products" key={item?.id}>
      <div className="cart__product-wrapper">
        <Link
          href={`/product/${item?.productId}`}
          className="cart__product-first-row">
          <figure className="cart__product-image-wrapper">
            <img
              className="cart__product-image"
              src={item?.image}
              alt={item?.title || ""}
            />
          </figure>
          {/* <Count AddToCard={AddToCard} qty={addCard?.qty} /> */}
        </Link>
        <div className="cart__product-details">
          <div className="cart__product-details-wrapper">
            <h2 className="cart__product-title">{item?.title}</h2>
            <div className="cart__product-box">
              <p className="cart__product-text">Brad: </p>
              <p className="cart__product-text cart__product-text--secondery">
                {item?.brand}
              </p>
            </div>
            <div className="cart__product-box">
              <p className="cart__product-text">Color: </p>
              <p className="cart__product-text cart__product-text--secondery">
                {item?.color}
              </p>
            </div>
            <div className="cart__product-box">
              <p className="cart__product-text">Unit Price BDT :</p>
              <p className="cart__product-text  cart__product-text--secondery">
                {item?.price}
              </p>
            </div>
          </div>
          <div className="cart__product-action">
            <button
              type="button"
              className="cart__product-remove"
              onClick={() => {
                deleteCartList(item?.id || "");
                deleteCart();
              }}>
              <DeleteIcon className="cart__icon" />
            </button>
            <p className="cart__product-text">BDT {item?.total}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardList;
