import { PostPageContainer, PostPageContent } from "./PostPage.styles.ts";
import PostPageHeader from "./PostPageHeader/PostPageHeader.tsx";
import PostPageDetail from "./PostPageDetail/PostPageDetail.tsx";
import PostPageDiary from "./PostPageDiary/PostPageDiary.tsx";
import CommentModal from "../../components/Modal/CommentModal/CommentModal.tsx";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const PostPage = () => {
  const [toggleCommentModal, setToggleCommentModal] = useState(false);
  const { isLoading, data, isError, error } = useQuery(
    "get-post",
    () => {
      return axios.get("/posts");
    },
    {
      select: (r) => r.data[0],
    },
  );
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error}</>;

  return (
    <PostPageContainer>
      <PostPageContent>
        <PostPageHeader />
        <PostPageDetail setToggleCommentModal={setToggleCommentModal} />
        <PostPageDiary data={data} />
      </PostPageContent>
      {toggleCommentModal && <CommentModal />}
    </PostPageContainer>
  );
};

export default PostPage;
