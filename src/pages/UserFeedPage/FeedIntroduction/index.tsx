import React from "react";

import Button from "../../../components/Button";
import { UserFeedInfo } from "../../../types/userType.ts";
import { FeedPostType } from "../../../types/feedType.ts";
import { useFollowMutation } from "../../../hooks/useUserFeed.ts";

import {
  FeedIntroductionContainer,
  FeedIntroductionContent,
  FeedIntroductionImg,
  UserDescContainer,
  UserDetailStateContainer,
  UserNicknameContainer,
  UserStateContainer,
} from "./FeedIntroduction.styles.ts";

import userAvatar from "../../../assets/images/UserAvatar.png";
import { useNavigate } from "react-router-dom";

interface FeedIntroductionProps {
  setToggleFollowerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: UserFeedInfo;
  postData: FeedPostType;
  isLoginUser: boolean;
}

const FeedIntroduction: React.FC<FeedIntroductionProps> = ({
  setToggleFollowerModal,
  setToggleFollowModal,
  data,
  postData,
  isLoginUser,
}) => {
  const navigate = useNavigate();
  const { mutate } = useFollowMutation(data.userId);
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

  const handleSendMessageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`../chat/${data.userId}`);
  };

  return (
    <FeedIntroductionContainer>
      <FeedIntroductionContent>
        <FeedIntroductionImg>
          <img
            src={data?.profileImg ? data?.profileImg : userAvatar}
            alt={"profile_img"}
          />
        </FeedIntroductionImg>
        <UserStateContainer>
          <UserNicknameContainer>
            <p>{data.userName}</p>
            {!isLoginUser && (
              <div>
                <Button
                  followStatus={data.followStatus}
                  onClick={handleFollowClick}
                  className={"follow"}
                >
                  {data.followStatus ? "언팔로우" : "팔로우"}
                </Button>
                <Button
                  className={"send_message"}
                  onClick={handleSendMessageClick}
                >
                  메세지 보내기
                </Button>
              </div>
            )}
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
