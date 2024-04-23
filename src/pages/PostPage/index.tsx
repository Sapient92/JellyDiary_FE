import { PostPageContainer, PostPageContent } from "./PostPage.styles.ts";
import PostPageHeader from "./PostPageHeader";
import PostPageDetail from "./PostPageDetail";
import PostPageDiary from "./PostPageDiary";
import CommentModal from "../../components/Modal/CommentModal";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useModalStore } from "../../store/modalStore/modalStore.ts";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const PostPage = () => {
  const { id } = useParams();
  const [toggleCommentModal, setToggleCommentModal] = useState(false);
  const { confirmDeleteModal, toggleConfirmDeleteModal } = useModalStore(
    (state) => state,
  );
  const { isLoading, data, isError, error } = useQuery(
    "get-post",
    () => {
      return axios.get(`/posts/${id}`);
    },
    {
      select: (r) => r.data[0],
    },
  );

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error}</>;

  return (
    <PostPageContainer $confirmDeleteModal={confirmDeleteModal}>
      {confirmDeleteModal && (
        <ConfirmModal
          message={"게시글을 삭제하시겠습니까?"}
          confirm={"삭제"}
          cancel={"취소"}
          closeModal={toggleConfirmDeleteModal}
        />
      )}
      <PostPageContent>
        <PostPageHeader />
        <PostPageDetail
          data={data}
          setToggleCommentModal={setToggleCommentModal}
        />
        <PostPageDiary data={data} />
      </PostPageContent>
      {toggleCommentModal && (
        <CommentModal id={id} setToggleCommentModal={setToggleCommentModal} />
      )}
    </PostPageContainer>
  );
};

export default PostPage;
