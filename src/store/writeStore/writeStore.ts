import { create } from "zustand";
import { Diary } from "./writeStore.type.ts";

export type DiaryStoreProps = {
  diary: Diary;
  changeValue: (el: Object) => void;
};

export const useDiaryStore = create<DiaryStoreProps>((set) => ({
  diary: {
    title: "",
    createdAt: new Date().toISOString().split("T")[0],
    meal: "",
    snack: "",
    water: "",
    walk: "",
    defecation: "",
    bath: "",
    weight: "",
    significant: "",
  },
  changeValue: (el: Object) =>
    set((prev) => ({
      diary: {
        ...prev.diary,
        ...el,
      },
    })),
}));
