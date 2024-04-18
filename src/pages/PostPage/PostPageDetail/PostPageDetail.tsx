import React, { useState } from "react";
import {
  LikeButton,
  NotLikeButton,
  PostDetailBtnContainer,
  PostDetailDesc,
  PostDetailDescContainer,
  PostDetailImgContainer,
  PostPageDetailContainer,
} from "./PostPageDetail.styles.ts";
import detailImg from "../../../assets/testImage/FakeImg-Post.png";
import chatBtn from "../../../assets/button/ChattingBtn.png";
import sendBtn from "../../../assets/button/SendBtn.png";
import { Diary } from "../../../store/writeStore/diaryStore.type.ts";

interface PostPageDetailProps {
  setToggleCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Diary;
}

const PostPageDetail: React.FC<PostPageDetailProps> = ({
  setToggleCommentModal,
  data,
}) => {
  const { postTitle, createdAt, postContent } = data;
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const [like, setLike] = useState(false);
  const handleCommentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggleCommentModal(true);
  };
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <PostPageDetailContainer>
      <PostDetailImgContainer>
        <img src={detailImg} alt={"post_img"} />
      </PostDetailImgContainer>
      <PostDetailBtnContainer>
        <button onClick={() => setLike(!like)}>
          {!like ? <NotLikeButton /> : <LikeButton />}
        </button>
        <button>
          <img src={chatBtn} alt={"chat_button"} />
        </button>
        <button>
          <img src={sendBtn} alt={"send_button"} />
        </button>
      </PostDetailBtnContainer>
      <PostDetailDesc>
        <p>1,069 likes</p>
        <PostDetailDescContainer $seeMore={toggleSeeMore}>
          <p>{postTitle}</p>
          {!toggleSeeMore ? (
            <p>
              {postContent?.length > 50 ? (
                <>
                  {truncate(postContent, 50)}
                  <span onClick={() => setToggleSeeMore(true)}>더보기</span>
                </>
              ) : (
                postContent
              )}
            </p>
          ) : (
            <p>
              {postContent}
              <br />
              <span onClick={() => setToggleSeeMore(false)}>간략히 보기</span>
            </p>
          )}
        </PostDetailDescContainer>
        <div>
          <button onClick={handleCommentClick}>View all 100 comments</button>
        </div>
        <p>{createdAt.split("T")[0].replace(/-/g, ".")}</p>
      </PostDetailDesc>
    </PostPageDetailContainer>
  );
};

export default PostPageDetail;
