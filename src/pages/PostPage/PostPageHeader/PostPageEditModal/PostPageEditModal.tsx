import { EditModalContainer } from "./PostPageEditModal.styled.ts";
import React, { Dispatch, SetStateAction, useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside.ts";

interface PostPageEditModalProps {
  setToggleEditModal: Dispatch<SetStateAction<boolean>>;
}

const PostPageEditModal: React.FC<PostPageEditModalProps> = ({
  setToggleEditModal,
}) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    setToggleEditModal(false);
  });

  return (
    <EditModalContainer ref={modalRef}>
      <p>수정</p>
      <p>삭제</p>
    </EditModalContainer>
  );
};

export default PostPageEditModal;
