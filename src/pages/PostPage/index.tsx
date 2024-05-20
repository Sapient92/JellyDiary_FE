import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostPageHeader from "./PostPageHeader";
import PostPageDetail from "./PostPageDetail";
import PostPageDiary from "./PostPageDiary";
import CommentModal from "../../components/Modal/CommentModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

import { useFetchPost } from "../../hooks/usePost.ts";
import { useModalStore } from "../../store/modalStore/modalStore.ts";

import { PostPageContainer, PostPageContent } from "./PostPage.styles.ts";
import { useFetchLoginUser } from "../../hooks/useLoginUser.ts";
import { useUserStore } from "../../store/userStore/userStore.ts";

const PostPage = () => {
  const { id } = useParams();
  const [toggleCommentModal, setToggleCommentModal] = useState(false);
  const { confirmDeleteModal, toggleConfirmDeleteModal } = useModalStore(
    (state) => state,
  );
  const { isLoading, data, isError, error } = useFetchPost(id as string);
  const { data: loginUser } = useFetchLoginUser();
  const setLoginUserId = useUserStore((state) => state.setLoginUserId);

  useEffect(() => {
    if (loginUser) {
      setLoginUserId(loginUser?.userId);
    }
  }, [loginUser]);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <PostPageContainer $confirmDeleteModal={confirmDeleteModal}>
      {confirmDeleteModal && (
        <ConfirmModal
          message={"게시글을 삭제하시겠습니까?"}
          confirm={"삭제"}
          cancel={"취소"}
          closeModal={toggleConfirmDeleteModal}
          id={id}
          userId={data.userId}
        />
      )}
      <PostPageContent>
        <PostPageHeader data={data} />
        <PostPageDetail id={id} setToggleCommentModal={setToggleCommentModal} />
        <PostPageDiary data={data} />
      </PostPageContent>
      {toggleCommentModal && (
        <CommentModal
          id={id}
          userId={data.userId}
          setToggleCommentModal={setToggleCommentModal}
        />
      )}
    </PostPageContainer>
  );
};

export default PostPage;
