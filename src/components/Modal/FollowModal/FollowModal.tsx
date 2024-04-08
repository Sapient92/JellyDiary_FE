import {
  FollowModalContainer,
  FollowModalContent,
  TitleContainer,
} from "./FollowModal.styles.ts";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import FollowList from "./FollowList/FollowList.tsx";
import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";

interface FollowModal {
  title: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const FollowModal: FC<FollowModal> = ({ title, closeModal }) => {
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
