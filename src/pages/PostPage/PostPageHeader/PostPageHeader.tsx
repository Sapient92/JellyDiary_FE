import {
  PostMenuButton,
  PostPageHeaderContainer,
  UserProfileContainer,
} from "./PostPageHeader.styles.ts";
import userImg from "../../../assets/testImage/FakeUser-2.png";
import vectorBtn from "../../../assets/button/ButtonVector.png";

const PostPageHeader = () => {
  return (
    <PostPageHeaderContainer>
      <UserProfileContainer>
        <img src={userImg} alt={"feed_user_img"} />
        <p>terrylucas</p>
      </UserProfileContainer>
      <PostMenuButton>
        <img src={vectorBtn} alt={"post_menu_button"} />
      </PostMenuButton>
    </PostPageHeaderContainer>
  );
};

export default PostPageHeader;
