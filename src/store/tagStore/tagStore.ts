import { create } from "zustand";

interface MentionUsers {
  childIndex: number;
  display: string;
  id: string;
  index: number;
  plainTextIndex: number;
}

interface UseTagsStore {
  userTag: MentionUsers[] | [];
  setUserTag: (mentions: MentionUsers[]) => void;
}

export const useTagsStore = create<UseTagsStore>((set) => ({
  userTag: [],
  setUserTag: (mentions: MentionUsers[]) =>
    set(() => ({
      userTag: [...mentions],
    })),
}));
