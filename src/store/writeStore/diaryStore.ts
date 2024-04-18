import { create } from "zustand";
import { Diary } from "./diaryStore.type.ts";

export type DiaryStoreProps = {
  diary: Diary;
  changeValue: (el: object) => void;
};

export const useDiaryStore = create<DiaryStoreProps>((set) => ({
  diary: {
    postTitle: "",
    createdAt: new Date().toISOString(),
    postDate: new Date().toISOString().split("T")[0],
    postContent: "",
    isPublic: true,
    weather: "",
    meal: null,
    snack: null,
    water: null,
    walk: null,
    toiletRecord: null,
    shower: null,
    weight: null,
    specialNote: null,
  },
  changeValue: (el: object) =>
    set((prev) => ({
      diary: {
        ...prev.diary,
        ...el,
      },
    })),
}));
