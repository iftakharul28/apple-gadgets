import { useCart } from "@/store";
import type { Category, Color, Storage } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Count } from "@/components";
type productType = {
  id: string;
  image: string | null;
  title: string | null;
  brand: string | null;
  description: string | null;
  price: number | null;
  published: boolean;

  category: Category[];
  color: Color[];
  storage: Storage[];
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
  const [selectedColor, setSelectedColor] = useState(product?.color[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0]);
  const [addCard, setAddCard] = useState<cardType>({
    price: 0,
    qty: 1,
    total: 0,
  });
  const ActiveProduct = (id: string) => {
    if (id) {
      setSelectedColor(product?.color.find((el) => el.id === id));
    }
    return "";
  };
  const ActiveStorage = (id: string) => {
    if (id) {
      setSelectedStorage(product?.storage.find((el) => el.id === id));
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
      if (selectedColor) {
        const find = cartList.some((item) => item.id == selectedColor?.id);
        console.log(find);
        if (!find) {
          updateCart();
          addCartList({
            productId: product?.id,
            id: selectedColor?.id,
            title: product?.title,
            image: selectedColor?.image || "",
            brand: product?.brand || "",
            color: selectedColor?.color || "",
            storage: selectedStorage?.storage || "",
            price: Number(selectedStorage?.price),
            qty: addCard?.qty,
            total: Number(addCard?.qty) * Number(selectedStorage?.price),
          });
        }
        updateCartList({
          productId: product?.id,
          id: selectedColor?.id,
          title: product?.title,
          brand: product?.brand || "",
          image: selectedColor?.image || "",
          color: selectedColor?.color || "",
          storage: selectedStorage?.storage || "",
          price: Number(selectedStorage?.price),
          qty: addCard?.qty,
          total: Number(addCard?.qty) * Number(selectedStorage?.price),
        });
      }
    }
  };
  return (
    <div className="product__main">
      <div className="product__image-wrapper">
        <img
          className="product__image"
          src={selectedColor?.image || ""}
          alt={product?.title || ""}
        />
      </div>
      <div className="product__details-wrapper">
        <div className="product__details-card-wrapper">
          <div className="product__details-card">
            <p className="product__details-card-title">Cash Discount Price:</p>
            <p className="product__details-card-text">
              {selectedStorage?.price}
            </p>
          </div>
          <div className="product__details-card">
            <p className="product__details-card-title">Cash Discount Price:</p>
            <p className="product__details-card-text">In Stock</p>
          </div>
          <div className="product__details-card">
            <p className="product__details-card-title">Brand:</p>
            <p className="product__details-card-text">{product?.brand}</p>
          </div>
        </div>
        <div className="product__storage-wrapper">
          <p>storage:</p>
          {product?.storage.map(({ id, storage }: Storage, i: number) => (
            <div
              key={i}
              role="button"
              onClick={() => ActiveStorage(id)}
              className={
                selectedStorage?.id === id
                  ? "product__storage product__storage--active"
                  : "product__storage"
              }
              title={storage || ""}>
              <p className="product__storage-text">{storage}</p>
            </div>
          ))}
        </div>
        <div className="product__color-wrapper">
          <p>color:</p>
          {product?.color.map(
            ({ id, color, colorCode, price, image }: Color, i: number) => (
              <div
                key={i}
                role="button"
                onClick={() => ActiveProduct(id)}
                className={
                  selectedColor?.id === id
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
