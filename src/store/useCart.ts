import { create } from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";
import type { cartListType, useCartType } from "@/types";
//Zustand Store ✅ 🐻

const useCart = create(
  persist<useCartType>(
    (set) => ({
      cart: 0,
      cartList: [],
      finalPrice: 0,
      addFinalPrice: ({ price }: { price: number }) => {
        set(() => ({
          finalPrice: price,
        }));
      },
      setCart: () => {
        set(() => ({
          cart: 1,
        }));
      },
      updateCart: () => {
        set((state) => ({
          cart: state.cart + 1,
        }));
      },
      setCartList: ({
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
        set(() => ({
          cartList: [
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
          ],
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
            const cartIndex = state.cartList.findIndex(
              (el: cartListType) => el.id === id
            );
            state.cartList.splice(cartIndex, 1);
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
