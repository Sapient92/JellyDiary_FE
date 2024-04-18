import { create } from "zustand";

interface ModalStoreProps {
  imageAlertModal: boolean;
  toggleImageAlertModal: (el: boolean) => void;
  imgDupliAlertModal: boolean;
  toggleImgDupliAlertModal: (el: boolean) => void;
  confirmDeleteModal: boolean;
  toggleConfirmDeleteModal: (el: boolean) => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
  imageAlertModal: false,
  imgDupliAlertModal: false,
  confirmDeleteModal: false,
  toggleImageAlertModal: (el) =>
    set(() => ({
      imageAlertModal: el,
    })),
  toggleImgDupliAlertModal: (el) =>
    set(() => ({
      imgDupliAlertModal: el,
    })),
  toggleConfirmDeleteModal: (el) =>
    set(() => ({
      confirmDeleteModal: el,
    })),
}));
