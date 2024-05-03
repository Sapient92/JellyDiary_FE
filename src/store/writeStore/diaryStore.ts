import { create } from "zustand";

import { DiaryType } from "../../types/diaryType.ts";

export type DiaryStoreProps = {
  diary: DiaryType;
  changeValue: (el: object) => void;
};

export const useDiaryStore = create<DiaryStoreProps>((set) => ({
  diary: {
    postTitle: "",
    postDate: new Date().toISOString().split("T")[0],
    postContent: "",
    isPublic: true,
    weather: null,
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
