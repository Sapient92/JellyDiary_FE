import React, { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { LuCloudy } from "react-icons/lu";
import { BsCloudRain } from "react-icons/bs";
import { IoIosSnow } from "react-icons/io";
import { queryClient } from "../../../react-query/queryClient.ts";

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
import { queryKeys } from "../../../react-query/constants.ts";
import {
  useFetchPostLikeState,
  useLikeMutation,
} from "../../../hooks/usePost.ts";
import { AxiosResponse } from "axios";

interface PostPageDetailProps {
  setToggleCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

const PostPageDetail: React.FC<PostPageDetailProps> = ({
  setToggleCommentModal,
  id,
}) => {
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const { data: likeState } = useFetchPostLikeState(id as string);
  const { mutate } = useLikeMutation(id as string);

  const data: AxiosResponse = queryClient.getQueryData([queryKeys.post, id])!;
  const { postTitle, postContent, weather, postDate, likeCount } =
    data.data.data;

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

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const handleCommentClick = (
    e: React.MouseEvent<HTMLButtonElement | SVGElement>,
  ) => {
    e.preventDefault();
    setToggleCommentModal(true);
  };

  const handleLikeClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    mutate(likeState);
  };

  const handleSeemoreClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setToggleSeeMore(!toggleSeeMore);
  };

  return (
    <PostPageDetailContainer>
      <PostDetailImgContainer>
        <img src={detailImg} alt={"post_img"} />
      </PostDetailImgContainer>
      <PostDetailBtnContainer>
        <PostDetailBtnBox>
          <button>
            {!likeState ? (
              <NotLikeButton onClick={handleLikeClick} />
            ) : (
              <LikeButton onClick={handleLikeClick} />
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
        <p>{likeCount} likes</p>
        <PostDetailDescContainer $seeMore={toggleSeeMore}>
          <p>{postTitle}</p>
          {!toggleSeeMore ? (
            <p>
              {postContent?.length > 50 ? (
                <>
                  {truncate(postContent, 50)}
                  <span onClick={handleSeemoreClick}>더보기</span>
                </>
              ) : (
                postContent
              )}
            </p>
          ) : (
            <p>
              {postContent}
              <br />
              <span onClick={handleSeemoreClick}>간략히 보기</span>
            </p>
          )}
        </PostDetailDescContainer>
        <div>
          <button onClick={handleCommentClick}>View all 100 comments</button>
        </div>
        <p>{postDate.split("T")[0].replace(/-/g, ".")}</p>
      </PostDetailDesc>
    </PostPageDetailContainer>
  );
};

export default PostPageDetail;
