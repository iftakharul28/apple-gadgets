import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { useCuponType } from "@/types";
//Zustand Store ✅ 🐻
const useCupon = create(
  persist<useCuponType>(
    (set) => ({
      cuponList: [],
      setCuponList: ({ name }: { name: string }) => {
        set((state) => ({
          cuponList: state.cuponList.some((item) => item.name === name)
            ? [...state.cuponList]
            : [
                {
                  name,
                },
                ...state.cuponList,
              ],
        }));
      },
    }),
    {
      name: "cupon",
    }
  )
);
export default useCupon;
