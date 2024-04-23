import {
  FollowModalContainer,
  FollowModalContent,
  TitleContainer,
} from "./FollowModal.styles.ts";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import FollowList from "./FollowList";
import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";

interface FollowModalProps {
  title: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const FollowModal: FC<FollowModalProps> = ({ title, closeModal }) => {
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    closeModal(false);
  });

  return (
    <FollowModalContainer ref={modalRef}>
      <FollowModalContent>
        <TitleContainer>
          <p>{title}</p>
        </TitleContainer>
        <FollowList />
      </FollowModalContent>
    </FollowModalContainer>
  );
};

export default FollowModal;
