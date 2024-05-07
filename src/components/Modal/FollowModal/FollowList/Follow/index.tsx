import React from "react";

import { FollowType } from "../../../../../types/feedType.ts";

import {
  FollowButton,
  FollowContainer,
  UserContent,
  UserProfileDesc,
  UserProfileImg,
} from "./Follow.styles.ts";

import userAvatar from "../../../../../assets/images/UserAvatar.png";

interface FollowProps {
  data: FollowType;
}

const Follow: React.FC<FollowProps> = (data) => {
  const { profileImg, userId, userDesc, userName } = data.data;
  console.log(userId);

  return (
    <>
      <FollowContainer>
        <UserContent>
          <UserProfileImg>
            <img
              src={typeof profileImg === "string" ? profileImg : userAvatar}
              alt={"userProfileImg"}
            />
          </UserProfileImg>
          <UserProfileDesc>
            <p>{userName}</p>
            <p>{userDesc}</p>
          </UserProfileDesc>
        </UserContent>
        <FollowButton>팔로우</FollowButton>
      </FollowContainer>
    </>
  );
};

export default Follow;
