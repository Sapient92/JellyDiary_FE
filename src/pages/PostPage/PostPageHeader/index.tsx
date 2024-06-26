import React, { useState } from "react";

import PostPageEditModal from "./PostPageEditModal";

import { useFetchWriterInfo } from "../../../hooks/usePost.ts";
import useLoginUser from "../../../hooks/useLoginUser.ts";
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

import userAvatar from "../../../assets/images/UserAvatar.png";
import { useNavigate } from "react-router-dom";

interface PostPageHeaderProps {
  data: PostType;
}

const PostPageHeader: React.FC<PostPageHeaderProps> = ({ data }) => {
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const { data: userData } = useFetchWriterInfo(data.userId);
  const handleEditClick = () => {
    setToggleEditModal(true);
  };

  const { isLoginUser, loading } = useLoginUser(String(data.userId));
  const navigate = useNavigate();
  if (loading) return <>로딩중...</>;

  const handleDiaryClick = () => {
    navigate(`../../diary/${data?.diaryId}`);
  };

  return (
    <PostPageHeaderContainer>
      <UserProfileContainer>
        <img
          src={userData?.profileImg ? userData?.profileImg : userAvatar}
          alt={"feed_user_img"}
        />
        <LinkTag to={`../../userfeed/${userData?.userId}`}>
          <p>{userData?.userName}</p>
        </LinkTag>
      </UserProfileContainer>
      <HeaderButtonContainer>
        <PostMenuButton>
          <DiaryButton onClick={handleDiaryClick} />
        </PostMenuButton>
        <EditButtonContainer>
          {isLoginUser && (
            <>
              <EditButton onClick={handleEditClick} />
              {toggleEditModal && (
                <PostPageEditModal setToggleEditModal={setToggleEditModal} />
              )}
            </>
          )}
        </EditButtonContainer>
      </HeaderButtonContainer>
    </PostPageHeaderContainer>
  );
};

export default PostPageHeader;
