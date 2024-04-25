import React, { useState } from "react";
import {
  SuggestedPostContainer,
  SuggestedPostHeader,
  UserButton,
  PawButton,
} from "./SuggestedPost.styles";
import fakeImg from "../../../../assets/testImage/suggestedPostImage.png";
import LikeButton from "../../../../components/LikeButton/LikeButton";

const SuggestedPost = () => {
  const [like, setLike] = useState(false);
  const toggleLike = async () => {
    setLike(!like);
  };

  return (
    <SuggestedPostContainer>
      <SuggestedPostHeader>
        <div>
          <img src={fakeImg} alt="profile_img" />
          <div>Club Doggo</div>
        </div>
        <UserButton>
          <img src={fakeImg} alt="user_img" />
          <div>User</div>
        </UserButton>
      </SuggestedPostHeader>
      <div>
        <img src={fakeImg} alt={"feed_img"} />
        <PawButton>
          <LikeButton like={like} onClick={toggleLike} />
        </PawButton>
      </div>
    </SuggestedPostContainer>
  );
};

export default SuggestedPost;
