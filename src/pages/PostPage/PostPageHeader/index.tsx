import React, { useState } from "react";

import PostPageEditModal from "./PostPageEditModal";

import { PostType } from "../../../types/postType.ts";

import {
  DiaryButton,
  EditButton,
  EditButtonContainer,
  HeaderButtonContainer,
  LinkTag,
  PostMenuButton,
  PostPageHeaderContainer,
  UserProfileContainer,
} from "./PostPageHeader.styles.ts";

import userImg from "../../../assets/testImage/FakeUser-2.png";
import { useFetchWriterInfo } from "../../../hooks/usePost.ts";

interface PostPageHeaderProps {
  data: PostType;
}

const PostPageHeader: React.FC<PostPageHeaderProps> = ({ data }) => {
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const { data: userData } = useFetchWriterInfo(data.userId);

  const handleEditClick = () => {
    setToggleEditModal(true);
  };

  return (
    <PostPageHeaderContainer>
      <UserProfileContainer>
        <img src={userImg} alt={"feed_user_img"} />
        <LinkTag to={`../../userfeed/${userData?.userId}`}>
          <p>{userData?.userName}</p>
        </LinkTag>
      </UserProfileContainer>
      <HeaderButtonContainer>
        <PostMenuButton>
          <DiaryButton />
        </PostMenuButton>
        <EditButtonContainer>
          <EditButton onClick={handleEditClick} />
          {toggleEditModal && (
            <PostPageEditModal setToggleEditModal={setToggleEditModal} />
          )}
        </EditButtonContainer>
      </HeaderButtonContainer>
    </PostPageHeaderContainer>
  );
};

export default PostPageHeader;
