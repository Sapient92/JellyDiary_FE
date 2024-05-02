import { Dispatch, FC, SetStateAction, useRef } from "react";

import FollowList from "./FollowList";

import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";

import {
  FollowModalContainer,
  FollowModalContent,
  TitleContainer,
} from "./FollowModal.styles.ts";

interface FollowModalProps {
  title: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
  follow: number;
}

const FollowModal: FC<FollowModalProps> = ({ title, closeModal, follow }) => {
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    closeModal(false);
  });

  return (
    <FollowModalContainer ref={modalRef}>
      <FollowModalContent>
        <TitleContainer>
          <p>
            {follow} {title}
          </p>
        </TitleContainer>
        <FollowList />
      </FollowModalContent>
    </FollowModalContainer>
  );
};

export default FollowModal;
