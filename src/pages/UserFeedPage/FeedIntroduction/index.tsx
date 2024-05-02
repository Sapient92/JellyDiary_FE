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

interface FeedIntroductionProps {
  setToggleFollowerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: UserFeedInfo;
}

const FeedIntroduction: React.FC<FeedIntroductionProps> = ({
  setToggleFollowerModal,
  setToggleFollowModal,
  data,
}) => {
  console.log(data);

  const handleFollowClick = () => {
    setToggleFollowModal(true);
  };

  const handleFollowerClick = () => {
    setToggleFollowerModal(true);
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
              <Button className={"follow"}>팔로우</Button>
              <Button className={"send_message"}>메세지 보내기</Button>
            </div>
          </UserNicknameContainer>
          <UserDetailStateContainer>
            <p>{"1,258"}게시물</p>
            <p onClick={handleFollowerClick}> {data.followerCount}팔로워</p>
            <p onClick={handleFollowClick}>{data.followingCount}팔로우</p>
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
