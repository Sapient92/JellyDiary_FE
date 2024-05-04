import React from "react";

import Button from "../../../components/Button";

import { UserFeedInfo } from "../../../types/userType.ts";

import {
  FeedIntroductionContainer,
  FeedIntroductionContent,
  FeedIntroductionImg,
  UserDescContainer,
  UserDetailStateContainer,
  UserNicknameContainer,
  UserStateContainer,
} from "./FeedIntroduction.styles.ts";

import profileImg from "../../../assets/testImage/Image.png";
import api from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../react-query/queryClient.ts";
import { FeedPostType } from "../../../types/feedType.ts";

interface FeedIntroductionProps {
  setToggleFollowerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: UserFeedInfo;
  postData: FeedPostType;
}

const FeedIntroduction: React.FC<FeedIntroductionProps> = ({
  setToggleFollowerModal,
  setToggleFollowModal,
  data,
  postData,
}) => {
  const changeFollowStatus = (status: boolean) => {
    if (!status) {
      return api.post(`/api/feed/follow/${data.userId}`);
    } else {
      return api.delete(`/api/feed/follow/${data.userId}`);
    }
  };

  const { mutate } = useMutation({
    mutationFn: changeFollowStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-userFeed", String(data.userId)],
      });
    },
  });

  const handleFollowModalClick = () => {
    setToggleFollowModal(true);
  };

  const handleFollowerModalClick = () => {
    setToggleFollowerModal(true);
  };

  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(data.followStatus);
  };

  return (
    <FeedIntroductionContainer>
      <FeedIntroductionContent>
        <FeedIntroductionImg>
          <img src={profileImg} alt={"profile_img"} />
        </FeedIntroductionImg>
        <UserStateContainer>
          <UserNicknameContainer>
            <p>{data.userName}</p>
            <div>
              <Button onClick={handleFollowClick} className={"follow"}>
                {data.followStatus ? "언팔로우" : "팔로우"}
              </Button>
              <Button className={"send_message"}>메세지 보내기</Button>
            </div>
          </UserNicknameContainer>
          <UserDetailStateContainer>
            <p>{postData?.count}게시물</p>
            <p onClick={handleFollowerModalClick}>
              {" "}
              {data.followerCount}팔로워
            </p>
            <p onClick={handleFollowModalClick}>{data.followingCount}팔로우</p>
          </UserDetailStateContainer>
          <UserDescContainer>
            <p>{data.userDesc}</p>
          </UserDescContainer>
        </UserStateContainer>
      </FeedIntroductionContent>
    </FeedIntroductionContainer>
  );
};

export default FeedIntroduction;
