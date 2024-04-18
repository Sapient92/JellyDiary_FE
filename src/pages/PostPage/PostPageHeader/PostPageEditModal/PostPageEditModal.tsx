import { EditModalContainer, LinkStyled } from "./PostPageEditModal.styled.ts";
import React, { Dispatch, SetStateAction, useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside.ts";
import { useParams } from "react-router-dom";
import { useModalStore } from "../../../../store/modalStore/modalStore.ts";

interface PostPageEditModalProps {
  setToggleEditModal: Dispatch<SetStateAction<boolean>>;
}

const PostPageEditModal: React.FC<PostPageEditModalProps> = ({
  setToggleEditModal,
}) => {
  const { id } = useParams();
  const toggleConfirmDeleteModal = useModalStore(
    (state) => state.toggleConfirmDeleteModal,
  );
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    setToggleEditModal(false);
  });
  const handleDeleteClick = () => {
    toggleConfirmDeleteModal(true);
    setToggleEditModal(false);
  };

  return (
    <EditModalContainer ref={modalRef}>
      <LinkStyled to={`../../../edit/${id}`}>
        <p>수정</p>
      </LinkStyled>
      <p onClick={handleDeleteClick}>삭제</p>
    </EditModalContainer>
  );
};

export default PostPageEditModal;
