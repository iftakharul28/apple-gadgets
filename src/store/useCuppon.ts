import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { useCuponType } from "@/types";
//Zustand Store ✅ 🐻
const useCuppon = create(
  persist<useCuponType>(
    (set) => ({
      cupponList: [],
      setCupponList: ({ name }: { name: string }) => {
        set((state) => ({
          cupponList: state.cupponList.some((item) => item.name === name)
            ? [...state.cupponList]
            : [
                {
                  name,
                },
                ...state.cupponList,
              ],
        }));
      },
    }),
    {
      name: "cuppon",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useCuppon;
