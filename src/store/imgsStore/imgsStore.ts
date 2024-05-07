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
    set((prev) => {
      if (prev.writeImgs.postImgs === null) {
        return {
          writeImgs: { ...prev.writeImgs, postImgs: imgs },
        };
      } else if (imgs) {
        const newImgs = [...prev.writeImgs.postImgs, ...imgs];
        return {
          writeImgs: { ...prev.writeImgs, postImgs: newImgs },
        };
      } else {
        return {
          writeImgs: { ...prev.writeImgs },
        };
      }
    }),
  deleteImgIds: [],
  addedDeleteImgIds: (id) =>
    set((prev) => ({
      deleteImgIds: [...prev.deleteImgIds, id],
    })),
}));
