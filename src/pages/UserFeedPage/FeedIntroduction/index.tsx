import React from "react";

import Button from "../../../components/Button";

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
}

const FeedIntroduction: React.FC<FeedIntroductionProps> = ({
  setToggleFollowerModal,
  setToggleFollowModal,
}) => {
  return (
    <FeedIntroductionContainer>
      <FeedIntroductionContent>
        <FeedIntroductionImg>
          <img src={profileImg} alt={"profile_img"} />
        </FeedIntroductionImg>
        <UserStateContainer>
          <UserNicknameContainer>
            <p>terrylucas</p>
            <div>
              <Button className={"follow"}>팔로우</Button>
              <Button className={"send_message"}>메세지 보내기</Button>
            </div>
          </UserNicknameContainer>
          <UserDetailStateContainer>
            <p>{"1,258"}게시물</p>
            <p onClick={() => setToggleFollowerModal(true)}> {"4M"}팔로워</p>
            <p onClick={() => setToggleFollowModal(true)}>{"1,250"}팔로우</p>
          </UserDetailStateContainer>
          <UserDescContainer>
            <p>Terry Lucas 입니다 안녕하세요</p>
          </UserDescContainer>
        </UserStateContainer>
      </FeedIntroductionContent>
    </FeedIntroductionContainer>
  );
};

export default FeedIntroduction;
