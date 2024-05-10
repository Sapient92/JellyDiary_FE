import { create } from "zustand";
import { PostImgsType } from "../../types/postType.ts";

interface useImgsStoreProps {
  writeImgs: PostImgsType;
  changeImgs: (imgs: File[]) => void;
  deleteImgIds: number[];
  addedDeleteImgIds: (id: number) => void;
}

export const useImgsStore = create<useImgsStoreProps>((set) => ({
  writeImgs: { postImgs: [] as File[] },
  changeImgs: (imgs: File[]) =>
    set((prev) => ({
      writeImgs: {
        ...prev.writeImgs,
        postImgs: imgs,
      },
    })),
  deleteImgIds: [],
  addedDeleteImgIds: (id) =>
    set((prev) => ({
      deleteImgIds: [...prev.deleteImgIds, id],
    })),
}));
