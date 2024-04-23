import {
  FollowButton,
  FollowContainer,
  UserContent,
  UserProfileDesc,
  UserProfileImg,
} from "./Follow.styles.ts";
import testImg from "../../../../../assets/testImage/FakeUser-1.png";

const Follow = () => {
  return (
    <>
      <FollowContainer>
        <UserContent>
          <UserProfileImg>
            <img src={testImg} alt={"user-img"} />
          </UserProfileImg>
          <UserProfileDesc>
            <p>lauramatthews</p>
          </UserProfileDesc>
        </UserContent>
        <FollowButton>팔로우</FollowButton>
      </FollowContainer>
    </>
  );
};

export default Follow;
