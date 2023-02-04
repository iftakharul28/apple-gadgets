import { create } from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";
//Zustand Store ✅ 🐻
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
type useCartType = {
  cart: number;
  cartList: cartListType[];
  updateCart: () => void;
  addCartList: ({
    productId,
    id,
    title,
    brand,
    color,
    size,
    qty,
    price,
    total,
  }: cartListType) => void;
  updateCartList: ({
    productId,
    id,
    title,
    color,
    brand,
    size,
    qty,
    price,
    total,
  }: cartListType) => void;
  deleteCart: () => void;
  deleteCartList: (id: string) => void;
};

const useCart = create(
  persist<useCartType>(
    (set) => ({
      cart: 0,
      cartList: [],
      updateCart: () => {
        set((state) => ({
          cart: state.cart + 1,
        }));
      },
      addCartList: ({
        productId,
        id,
        color,
        title,
        image,
        size,
        brand,
        qty,
        price,
        total,
      }: cartListType) => {
        set((state) => ({
          cartList: state.cartList.some((item) => item.id === id)
            ? [...state.cartList]
            : [
                {
                  productId,
                  id,
                  title,
                  brand,
                  color,
                  image,
                  size,
                  qty,
                  price,
                  total,
                },
                ...state.cartList,
              ],
        }));
      },
      updateCartList: ({
        id,
        color,
        size,
        storage,
        qty,
        price,
        total,
      }: cartListType) =>
        set(
          produce((state) => {
            const array = [...state.cartList];
            const index = array.findIndex((item) => item.id === id);
            if (array[index].qty < qty) {
              array[index].color = color;
              array[index].size = size;
              array[index].storage = storage;
              array[index].qty = qty;
              array[index].price = price;
              array[index].total = total;
            }
          })
        ),
      deleteCart: () => {
        set((state) => ({
          cart: state.cart - 1,
        }));
      },
      deleteCartList: (id: string) =>
        set(
          produce((state) => {
            const dramaIndex = state.cartList.findIndex(
              (el: cartListType) => el.id === id
            );
            state.cartList.splice(dramaIndex, 1);
            state.cart - 1;
          })
        ),
    }),
    {
      name: "cart",
    }
  )
);
export default useCart;
