import { create } from "zustand";

interface UserStoreProps {
  loginUserId: number | null;
  setLoginUserId: (id: number) => void;
}

export const useUserStore = create<UserStoreProps>((set) => ({
  loginUserId: null,
  setLoginUserId: (id: number) =>
    set({
      loginUserId: id,
    }),
}));
