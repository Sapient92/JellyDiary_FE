import { create } from "zustand";
import { PostImgsType } from "../../types/diaryType.ts";

interface useImgsStoreProps {
  writeImgs: PostImgsType;
  changeImgs: (imgs: File[]) => void;
}

export const useImgsStore = create<useImgsStoreProps>((set) => ({
  writeImgs: { postImgs: [] as File[] },
  changeImgs: (imgs: File[]) =>
    set((prev) => ({
      writeImgs: { ...prev.writeImgs, postImgs: imgs },
    })),
}));
