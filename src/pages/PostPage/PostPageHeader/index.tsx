import React, { useState } from "react";

import PostPageEditModal from "./PostPageEditModal";

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
import { PostType } from "../../../types/diaryType.ts";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import { Link } from "react-router-dom";

interface PostPageHeaderProps {
  data: PostType;
}

const PostPageHeader: React.FC<PostPageHeaderProps> = ({ data }) => {
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const { data: userData } = useQuery({
    queryKey: ["fetch-userData", data.userId],
    queryFn: () => api.get(`/api/feed/userInfo/${data.userId}`),
    select: (data) => data.data.data,
  });

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
