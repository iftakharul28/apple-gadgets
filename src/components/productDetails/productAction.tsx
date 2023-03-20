import { ChangeEvent, useState } from "react";
import { Alart, Count } from "@/components";
import { ActionButton } from "@/components/buttons";
import { useRouter } from "next/router";
import { useCart } from "@/store";
import type { Category, Color, Storage } from "@prisma/client";
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
  const router = useRouter();
  const setCart = useCart((state) => state?.setCart);
  const updateCart = useCart((state) => state?.updateCart);
  const setCartList = useCart((state) => state?.setCartList);
  const addCartList = useCart((state) => state?.addCartList);
  const updateCartList = useCart((state) => state?.updateCartList);
  const cartList = useCart((state) => state?.cartList);
  const [selectedColor, setSelectedColor] = useState(product?.color[0]);
  const [alart, setAlart] = useState<boolean>(false);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0]);
  const [addCard, setAddCard] = useState<cardType>({
    price: 0,
    qty: 1,
    total: 0,
  });
  const AddToCard = (key: string, e?: ChangeEvent<HTMLInputElement>) => {
    switch (key) {
      case "add":
        setAddCard({
          ...addCard,
          qty: addCard?.qty ? addCard?.qty + 1 : 1,
        });
        break;
      case "update":
        setAddCard({ ...addCard, qty: Number(e?.target.value) });
        break;
      case "remove":
        setAddCard({
          ...addCard,
          qty: addCard?.qty ? addCard?.qty - 1 : 1,
        });
        break;
      default:
        break;
    }
  };
  const buttonAction = (type: string) => {
    switch (type) {
      case "buy":
        router.push("/checkout");
        setCart();
        setCartList({
          productId: product?.id,
          id: selectedColor?.id,
          title: product?.title,
          image: selectedColor?.image || "",
          brand: product?.brand || "",
          color: selectedColor?.color || "",
          storage: selectedStorage?.storage || "",
          price: selectedStorage?.price
            ? Number(selectedStorage?.price)
            : Number(selectedColor?.price),
          qty: addCard?.qty,
          total:
            addCard?.qty *
            (selectedStorage?.price
              ? Number(selectedStorage?.price)
              : Number(selectedColor?.price)),
        });
        break;
      case "card":
        if (
          selectedColor &&
          selectedStorage?.price != 0 &&
          selectedColor?.price != 0
        ) {
          const find = cartList.some((item) => item.id == selectedColor?.id);
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
              price: selectedStorage?.price
                ? Number(selectedStorage?.price)
                : Number(selectedColor?.price),
              qty: addCard?.qty,
              total:
                addCard?.qty *
                (selectedStorage?.price
                  ? Number(selectedStorage?.price)
                  : Number(selectedColor?.price)),
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
            price: selectedStorage?.price
              ? Number(selectedStorage?.price)
              : Number(selectedColor?.price),
            qty: addCard?.qty,
            total:
              addCard?.qty *
              (selectedStorage?.price
                ? Number(selectedStorage?.price)
                : Number(selectedColor?.price)),
          });
        } else {
          setAlart(true);
        }
        break;
      default:
        break;
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
        <h1 className="product__heading">{product?.title}</h1>
        <div className="product__details-card-wrapper">
          <div className="product__details-card">
            <p className="product__details-card-title">Cash Discount Price:</p>
            <p className="product__details-card-text">
              {selectedStorage?.price
                ? selectedStorage?.price
                : selectedColor?.price}
              ৳
            </p>
          </div>
          <div className="product__details-card">
            <p className="product__details-card-title">Cash Discount Price:</p>
            <p className="product__details-card-text">
              {selectedStorage?.price === 0 || selectedColor?.price === 0
                ? "Pre Order"
                : "In Stock"}
            </p>
          </div>
          <div className="product__details-card">
            <p className="product__details-card-title">Brand:</p>
            <p className="product__details-card-text">{product?.brand}</p>
          </div>
        </div>
        {product?.storage?.length != 0 && (
          <div className="product__storage-wrapper">
            <p>storage:</p>
            {product?.storage.map(({ id, storage }: Storage, i: number) => (
              <button
                type="button"
                key={i}
                onClick={() =>
                  setSelectedStorage(
                    product?.storage.find((el) => el.id === id)
                  )
                }
                className={
                  selectedStorage?.id === id
                    ? "product__storage product__storage--active"
                    : "product__storage"
                }
                title={storage || ""}>
                <p className="product__storage-text">{storage}</p>
              </button>
            ))}
          </div>
        )}
        {product?.color?.length != 0 && (
          <div className="product__color-wrapper">
            <p>color:</p>
            {product?.color.map(
              ({ id, color, colorCode }: Color, i: number) => (
                <button
                  type="button"
                  key={i}
                  onClick={() =>
                    setSelectedColor(product?.color.find((el) => el.id === id))
                  }
                  className={
                    selectedColor?.id === id
                      ? "product__color product__color--active"
                      : "product__color "
                  }
                  title={color || ""}
                  style={{ backgroundColor: colorCode || "" }}>
                  <p className="visually-hidden">{color}</p>
                </button>
              )
            )}
          </div>
        )}
        <div className="product__account">
          <Count AddToCard={AddToCard} qty={addCard?.qty} />
          <ActionButton
            onClick={() => buttonAction("buy")}
            type="button"
            className="product__button product__button--secondey">
            Buy Now
          </ActionButton>
          <ActionButton
            onClick={() => buttonAction("card")}
            type="button"
            className="product__button">
            Add to card
          </ActionButton>
        </div>
      </div>
      {alart ? (
        <Alart
          heading="Cart Issue"
          text="product not added"
          close={() => setAlart(false)}
        />
      ) : null}
    </div>
  );
};

export default ProductAction;
