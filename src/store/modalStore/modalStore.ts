import { create } from "zustand";

interface ModalStoreProps {
  imageAlertModal: boolean;
  toggleImageAlertModal: (el: boolean) => void;
  imgDupliAlertModal: boolean;
  toggleImgDupliAlertModal: (el: boolean) => void;
  confirmDeleteModal: boolean;
  toggleConfirmDeleteModal: (el: boolean) => void;
  titleAlertModal: boolean;
  toggleTitleAlertModal: (el: boolean) => void;
  commentAlertModal: boolean;
  showCommentAlertModal: (el: boolean) => void;
  replyAlertModal: boolean;
  showReplyAlertModal: (el: boolean) => void;
  commentDeleteModal: boolean;
  showCommentDeleteModal: (el: boolean) => void;
  replyDeleteModal: boolean;
  showReplyDeleteModal: (el: boolean) => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
  imageAlertModal: false,
  imgDupliAlertModal: false,
  confirmDeleteModal: false,
  titleAlertModal: false,
  commentAlertModal: false,
  replyAlertModal: false,
  commentDeleteModal: false,
  replyDeleteModal: false,
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
  toggleTitleAlertModal: (el) =>
    set(() => ({
      titleAlertModal: el,
    })),
  showCommentAlertModal: (el) =>
    set(() => ({
      commentAlertModal: el,
    })),
  showReplyAlertModal: (el) =>
    set(() => ({
      replyAlertModal: el,
    })),
  showCommentDeleteModal: (el) =>
    set(() => ({
      commentDeleteModal: el,
    })),
  showReplyDeleteModal: (el) =>
    set(() => ({
      replyDeleteModal: el,
    })),
}));
