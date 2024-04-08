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

const PostPageDetail = () => {
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
        <p>경주여행</p>
        <div>
          <button>View all 100 comments</button>
        </div>
        <p>2023.04.11</p>
      </PostDetailDesc>
    </PostPageDetailContainer>
  );
};

export default PostPageDetail;
