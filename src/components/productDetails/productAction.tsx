import { useCart } from "@/store";
import type { Variant } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Count } from "@/components";
type productType = {
  id: string;
  image: string | null;
  variants: {
    id: string;
    image: string | null;
    price: number | null;
    color: string | null;
    colorCode: string | null;
    size: string | null;
    storage: string | null;
    totalQty: number | null;
    brand: string | null;
  }[];
  title: string | null;
  description: string | null;
  price: number | null;
  published: boolean;
};
type cardType = {
  price?: number;
  qty: number;
  total?: number;
};
const ProductAction = ({ product }: { product: productType | null }) => {
  const updateCart = useCart((state) => state?.updateCart);
  const addCartList = useCart((state) => state?.addCartList);
  const updateCartList = useCart((state) => state?.updateCartList);
  const cartList = useCart((state) => state?.cartList);
  const [selected, setSelected] = useState(product?.variants[0]);
  const [addCard, setAddCard] = useState<cardType>({
    price: 0,
    qty: 1,
    total: 0,
  });
  const ActiveProduct = (id: string) => {
    if (id) {
      setSelected(product?.variants.find((el) => el.id === id));
    }
    return "";
  };
  const AddToCard = (key: string, e?: ChangeEvent<HTMLInputElement>) => {
    if (key === "add") {
      setAddCard({
        ...addCard,
        qty: addCard?.qty ? Number(addCard?.qty) + 1 : 1,
      });
    }
    if (key === "update") {
      setAddCard({ ...addCard, qty: Number(e?.target.value) });
    }
    if (key === "remove") {
      setAddCard({
        ...addCard,
        qty: addCard?.qty ? addCard?.qty - 1 : 1,
      });
    }
    return;
  };
  const buttonAction = (type: string) => {
    if (type === "buy") {
      console.log(type);
    }
    if (type === "card") {
      if (selected) {
        const find = cartList.some((item) => item.id == selected?.id);
        console.log(find);
        if (!find) {
          updateCart();
          addCartList({
            id: selected?.id,
            title: product?.title,
            brand: selected?.brand || "",
            image: selected?.image || "",
            color: selected?.color || "",
            size: selected?.size || "",
            storage: selected?.storage || "",
            price: Number(selected?.price),
            qty: addCard?.qty,
            total: Number(addCard?.qty) * Number(selected?.price),
          });
        }

        // let array = [...cardList];
        // const index = array.findIndex((item) => item.id === selected?.id);
        // console.log(index);
        updateCartList({
          id: selected?.id,
          title: product?.title,
          brand: selected?.brand || "",
          image: selected?.image || "",
          color: selected?.color || "",
          size: selected?.size || "",
          storage: selected?.storage || "",
          price: Number(selected?.price),
          qty: addCard?.qty,
          total: Number(addCard?.qty) * Number(selected?.price),
        });
      }
    }
  };
  return (
    <div className="product__main">
      <div className="product__image-wrapper">
        <img
          className="product__image"
          src={selected?.image || ""}
          alt={product?.title || ""}
        />
      </div>
      <div className="product__details-wrapper">
        <div className="product__details-card-wrapper">
          <div className="product__details-card">
            <p className="product__details-card-title">Cash Discount Price:</p>
            <p className="product__details-card-text">{product?.price}</p>
          </div>
          <div className="product__details-card">
            <p className="product__details-card-title">Cash Discount Price:</p>
            <p className="product__details-card-text">In Stock</p>
          </div>
          <div className="product__details-card">
            <p className="product__details-card-title">Brand:</p>
            <p className="product__details-card-text">Apple</p>
          </div>
        </div>
        <div className="product__color-wrapper">
          <p>color:</p>
          {product?.variants.map(
            (
              { id, color, colorCode, size, price, image }: Variant,
              i: number
            ) => (
              <div
                key={i}
                role="button"
                onClick={() => ActiveProduct(id)}
                className={
                  selected?.id === id
                    ? "product__color product__color--active"
                    : "product__color "
                }
                title={color || ""}
                style={{ backgroundColor: colorCode || "" }}>
                <p className="visually-hidden">{color}</p>
              </div>
            )
          )}
        </div>
        <div className="product__account">
          {/* <div className="product__actions-wrapper">
            <button
              className="product__action"
              onClick={() => AddToCard("remove")}>
              -
            </button>
            <label className="visually-hidden" htmlFor="add">
              add
            </label>
            <input
              className="product__action-input"
              type="number"
              name="add"
              id="add"
              value={addCard?.qty ? addCard.qty : 1}
              onChange={(e) => AddToCard("update", e)}
            />
            <button
              className="product__action"
              onClick={() => AddToCard("add")}>
              +
            </button>
          </div> */}
          <Count AddToCard={AddToCard} qty={addCard?.qty} />
          <button
            type="button"
            className="product__button product__button--secondey"
            onClick={() => buttonAction("buy")}>
            Buy Now
          </button>
          <button
            type="button"
            className="product__button"
            onClick={() => buttonAction("card")}>
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAction;
