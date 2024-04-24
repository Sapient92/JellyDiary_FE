import React, { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { LuCloudy } from "react-icons/lu";
import { BsCloudRain } from "react-icons/bs";
import { IoIosSnow } from "react-icons/io";

import { DiaryType } from "../../../types/diaryType.ts";

import {
  CommentButton,
  LikeButton,
  NotLikeButton,
  PostDetailBtnBox,
  PostDetailBtnContainer,
  PostDetailDesc,
  PostDetailDescContainer,
  PostDetailImgContainer,
  PostPageDetailContainer,
  SendButton,
  WeatherContainer,
} from "./PostPageDetail.styles.ts";

import detailImg from "../../../assets/testImage/FakeImg-Post.png";

interface PostPageDetailProps {
  setToggleCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: DiaryType;
}

const PostPageDetail: React.FC<PostPageDetailProps> = ({
  setToggleCommentModal,
  data,
}) => {
  const { postTitle, createdAt, postContent, weather } = data;
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const [like, setLike] = useState(false);
  let Icons;
  switch (weather) {
    case "맑음":
      Icons = MdOutlineWbSunny;
      break;
    case "구름낀":
      Icons = IoPartlySunnyOutline;
      break;
    case "흐림":
      Icons = LuCloudy;
      break;
    case "비":
      Icons = BsCloudRain;
      break;
    case "눈":
      Icons = IoIosSnow;
      break;
  }

  const handleCommentClick = (
    e: React.MouseEvent<HTMLButtonElement | SVGElement>,
  ) => {
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
        <PostDetailBtnBox>
          <button>
            {!like ? (
              <NotLikeButton onClick={() => setLike(!like)} />
            ) : (
              <LikeButton onClick={() => setLike(!like)} />
            )}
          </button>
          <button>
            <CommentButton onClick={handleCommentClick} />
          </button>
          <button>
            <SendButton />
          </button>
        </PostDetailBtnBox>
        <WeatherContainer>{Icons ? <Icons /> : null}</WeatherContainer>
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
