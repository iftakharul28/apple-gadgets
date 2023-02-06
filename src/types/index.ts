import type { Dispatch, SetStateAction } from "react";

export type IconClassType = {
  className?: string | null;
};

export type siteType = {
  title?: string;
  children: JSX.Element | JSX.Element[];
};
export type loginValidation = {
  email?: string | null;
  password?: string | null;
};
export type registerValidation = {
  name?: string | null;
  email?: string | null;
  passWord?: string | null;
  cpassword?: string | null;
};

export type checkoutValidation = {
  name?: string | null;
  email?: string | null;
  address?: string | null;
};
export type registertype = {
  name: string;
  email: string;
  passWord: string;
  cpassword: string;
};
export type PaginationType = {
  current: number;
  total: number;
  site: string;
};
export type ProductType = {
  id?: string;
  title?: string | null;
  image?: string | null;
  brand?: string | null;
  description?: string | null;
  price?: number | null;
  published?: boolean;
};
export type CategoryType = {
  id?: string;
  name: string | null;
};
export type ColorType = {
  id?: string;
  color: string | null;
  colorCode: string | null;
  image: string | null;
  price: number | null;
  totalQty: number | null;
};
export type StorageType = {
  id?: string;
  storage: string | null;
  price: number | null;
  totalQty: number | null;
};
export type CategoryProps = {
  setCategory: Dispatch<SetStateAction<CategoryType[]>>;
  categories?: CategoryType[];
  category: CategoryType[];
};
export type ColorProps = {
  setColor: Dispatch<SetStateAction<ColorType[]>>;
  color: ColorType[];
};
export type StorageProps = {
  setStorage: Dispatch<SetStateAction<StorageType[]>>;
  storage: StorageType[];
};
export type VariantType = {
  id?: string | null;
  color?: string | null;
  colorCode?: string | null;
  image?: string | null;
  size?: string | null;
  storage?: string | null;
  price?: string | null;
  totalQty?: string;
  brand?: string | null;
};
export type VariantProps = {
  setVariant: Dispatch<SetStateAction<VariantType[]>>;
  setShowVariant: Dispatch<SetStateAction<boolean>>;
  variant: VariantType[];
};
export type VariantFormProps = {
  item: VariantType;
  setVariant: Dispatch<SetStateAction<VariantType[]>>;
  setShowVariant: Dispatch<SetStateAction<boolean>>;
  variant: VariantType[];
};

export type cartListType = {
  productId?: string;
  id?: string;
  title?: string | null;
  color?: string;
  image?: string;
  brand?: string;
  size?: string;
  storage?: string;
  price: number;
  qty: number;
  total: number;
};
export type useCartType = {
  cart: number;
  cartList: cartListType[];
  finalPrice: number;
  addFinalPrice: ({ price }: { price: number }) => void;
  setCart: () => void;
  updateCart: () => void;
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
  }: cartListType) => void;
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
export type useCuponType = {
  cuponList: { name: string }[];
  setCuponList: ({ name }: { name: string }) => void;
};
