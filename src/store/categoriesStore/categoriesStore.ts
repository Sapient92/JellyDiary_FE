import { create } from "zustand";

export interface CategoriesStoreProps {
  categories: {
    bigSns: boolean;
    smallSns: boolean;
    myFeed: boolean;
    dm: boolean;
    [key: string]: boolean;
  };
  changeCategory: (el: string) => void;
}

export const useCategoriesStore = create<CategoriesStoreProps>((set) => ({
  categories: { bigSns: true, smallSns: false, myFeed: false, dm: false },
  changeCategory: (el: string) =>
    set({
      categories: {
        bigSns: false,
        smallSns: false,
        myFeed: false,
        dm: false,
        [el]: true,
      },
    }),
}));
