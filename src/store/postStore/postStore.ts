import { create } from "zustand";

import { WriteInputType } from "../../types/postType.ts";

export type DiaryStoreProps = {
  post: WriteInputType;
  changeValue: (el: object) => void;
};

export const usePostInputStore = create<DiaryStoreProps>((set) => ({
  post: {
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
      post: {
        ...prev.post,
        ...el,
      },
    })),
}));
