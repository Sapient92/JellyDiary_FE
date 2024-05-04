import React, { useState } from "react";

import PostPageEditModal from "./PostPageEditModal";

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
import { PostType } from "../../../types/diaryType.ts";
import { useQueryClient } from "@tanstack/react-query";

interface PostPageHeaderProps {
  data: PostType;
}

const PostPageHeader: React.FC<PostPageHeaderProps> = ({ data }) => {
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData([
    "fetch-userFeed",
    String(data.userId),
  ]);
  console.log(userData);

  const handleEditClick = () => {
    setToggleEditModal(true);
  };

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
