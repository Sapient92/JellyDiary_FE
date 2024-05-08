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
import { useFollowMutation } from "../../../../../hooks/useUserFeed.ts";
import { useParams } from "react-router-dom";

interface FollowProps {
  data: FollowType;
  title?: string;
}

const Follow: React.FC<FollowProps> = ({ title, data }) => {
  const { userId: id } = useParams();
  const { profileImg, userDesc, userName, followStatus, userId } = data;
  const { mutate } = useFollowMutation(userId, id as string, title);
  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(followStatus);
  };

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
        <FollowButton $status={followStatus} onClick={handleFollowClick}>
          {followStatus === null ? "" : !followStatus ? "팔로우" : "언팔로우"}
        </FollowButton>
      </FollowContainer>
    </>
  );
};

export default Follow;
