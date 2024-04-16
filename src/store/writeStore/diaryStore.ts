import { create } from "zustand";
import { Diary } from "./diaryStore.type.ts";

export type DiaryStoreProps = {
  diary: Diary;
  changeValue: (el: object) => void;
};

export const useDiaryStore = create<DiaryStoreProps>((set) => ({
  diary: {
    postTitle: "",
    postDate: new Date().toISOString().split("T")[0],
    weather: "",
    meal: "",
    snack: "",
    water: "",
    walk: "",
    toiletRecord: "",
    shower: "",
    weight: "",
    specialNote: "",
  },
  changeValue: (el: object) =>
    set((prev) => ({
      diary: {
        ...prev.diary,
        ...el,
      },
    })),
}));
