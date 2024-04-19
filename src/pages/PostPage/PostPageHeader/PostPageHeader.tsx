import {
  DiaryButton,
  EditButton,
  EditButtonContainer,
  HeaderButtonContainer,
  PostMenuButton,
  PostPageHeaderContainer,
  UserProfileContainer,
} from "./PostPageHeader.styles.ts";
import userImg from "../../../assets/testImage/FakeUser-2.png";
import { useState } from "react";
import PostPageEditModal from "./PostPageEditModal/PostPageEditModal.tsx";

const PostPageHeader = () => {
  const [toggleEditModal, setToggleEditModal] = useState(false);

  return (
    <PostPageHeaderContainer>
      <UserProfileContainer>
        <img src={userImg} alt={"feed_user_img"} />
        <p>terrylucas</p>
      </UserProfileContainer>
      <HeaderButtonContainer>
        <PostMenuButton>
          <DiaryButton />
        </PostMenuButton>
        <EditButtonContainer>
          <EditButton onClick={() => setToggleEditModal(true)} />
          {toggleEditModal && (
            <PostPageEditModal setToggleEditModal={setToggleEditModal} />
          )}
        </EditButtonContainer>
      </HeaderButtonContainer>
    </PostPageHeaderContainer>
  );
};

export default PostPageHeader;
