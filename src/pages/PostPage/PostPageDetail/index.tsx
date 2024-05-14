import React, { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { AxiosResponse } from "axios";
import { IoPartlySunnyOutline } from "react-icons/io5";
import PostDetailImgs from "./PostDetailImgs";
import { LuCloudy } from "react-icons/lu";
import { BsCloudRain } from "react-icons/bs";
import { IoIosSnow } from "react-icons/io";
import { queryClient } from "../../../react-query/queryClient.ts";
import { queryKeys } from "../../../react-query/constants.ts";

import {
  CommentButton,
  LikeButton,
  LinkTag,
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
import {
  useFetchPostLikeState,
  useLikeMutation,
} from "../../../hooks/usePost.ts";
import useLoginUser from "../../../hooks/useLoginUser.ts";

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
  const {
    postTitle,
    postContent,
    weather,
    postDate,
    likeCount,
    commentCount,
    postImgs,
    userId,
  } = data.data.data;
  const { isLoginUser } = useLoginUser(userId);

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
        <PostDetailImgs postImgs={postImgs} />
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
          {!isLoginUser && (
            <button>
              <LinkTag to={`../../chat/${userId}`}>
                <SendButton />
              </LinkTag>
            </button>
          )}
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
          <button onClick={handleCommentClick}>
            {commentCount !== 0
              ? `${commentCount}개의 댓글 보기`
              : "댓글 작성하기"}
          </button>
        </div>
        <p>{postDate.split("T")[0].replace(/-/g, ".")}</p>
      </PostDetailDesc>
    </PostPageDetailContainer>
  );
};

export default PostPageDetail;
