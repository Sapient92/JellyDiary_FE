import {
  PostDetailBtnContainer,
  PostDetailDesc,
  PostDetailImgContainer,
  PostPageDetailContainer,
} from "./PostPageDetail.styles.ts";
import detailImg from "../../../assets/testImage/FakeImg-Post.png";
import heartBtn from "../../../assets/button/HeartBtn.png";
import chatBtn from "../../../assets/button/ChattingBtn.png";
import sendBtn from "../../../assets/button/SendBtn.png";
import * as React from "react";
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
  const handleCommentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggleCommentModal(true);
  };

  return (
    <PostPageDetailContainer>
      <PostDetailImgContainer>
        <img src={detailImg} alt={"post_img"} />
      </PostDetailImgContainer>
      <PostDetailBtnContainer>
        <button>
          <img src={heartBtn} alt={"heart_button"} />
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
        <p>{postTitle}</p>
        <p>{postContent}</p>
        <div>
          <button onClick={handleCommentClick}>View all 100 comments</button>
        </div>
        <p>{createdAt.split("T")[0].replaceAll("-", ".")}</p>
      </PostDetailDesc>
    </PostPageDetailContainer>
  );
};

export default PostPageDetail;
