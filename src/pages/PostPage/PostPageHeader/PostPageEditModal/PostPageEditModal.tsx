import { EditModalContainer } from "./PostPageEditModal.styled.ts";
import React, { Dispatch, SetStateAction, useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside.ts";
import { Link, useParams } from "react-router-dom";

interface PostPageEditModalProps {
  setToggleEditModal: Dispatch<SetStateAction<boolean>>;
}

const PostPageEditModal: React.FC<PostPageEditModalProps> = ({
  setToggleEditModal,
}) => {
  const { id } = useParams();
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    setToggleEditModal(false);
  });

  return (
    <EditModalContainer ref={modalRef}>
      <Link to={`../../../edit/${id}`}>
        <p>수정</p>
      </Link>
      <p>삭제</p>
    </EditModalContainer>
  );
};

export default PostPageEditModal;
