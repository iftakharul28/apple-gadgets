import type { Dispatch, SetStateAction } from "react";

export type IconClassType = {
  className?: string | null;
};

export type siteType = {
  title?: string;
  description?: string;
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
  title?: string | null;
  image?: string | null;
  description?: string | null;
  price?: number | null;
  published?: boolean;
};
export type CategoryType = {
  id?: string;
  name: string | null;
};
export type CategoryProps = {
  setCategory: Dispatch<SetStateAction<CategoryType[]>>;
  categories?: CategoryType[];
  category: CategoryType[];
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
