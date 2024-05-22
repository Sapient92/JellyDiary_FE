import React, { useState } from 'react';

import {
  SuggestedPostContainer,
  SuggestedPostHeader,
  NotLikeButton,
  LikeButton,
  PawButton,
} from './SuggestedPost.styles.ts';

import fakeImg from '../../../../assets/images/UserAvatar.png';
import { useNavigate } from 'react-router-dom';
import { useFetchPostLikeState, useLikeMutation } from '../../../../hooks/usePost.ts';
import Modal from './Modal/index.tsx';

interface snsListProps {
  userId: number;
  userName: string;
  userProfileImg: string;
  postId: number;
  postImg: string;
  diaryId: number;
  diaryName: string;
  diaryProfileImage: string;
  like: boolean;
}
interface Props {
  item: snsListProps;
}
const SuggestedPost = (item: Props) => {
  const navigate = useNavigate();
  const { mutate } = useLikeMutation(item.item.postId + '');
  const { data: likeState } = useFetchPostLikeState(item.item.postId + '');
  const [showModal, setShowModal] = useState(false);

  const handleLikeClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    mutate(likeState);
  };

  const handleDiaryButton = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleGoToDiary = () => {
    setShowModal(false);
    navigate(`/diary/${item.item.diaryId}`); // navigate to the diary page
  };

  const handleGoToUserPage = () => {
    setShowModal(false);
    navigate(`/userfeed/${item.item.userId}`); // navigate to the user page
  };

  const handlePostImg = () => {
    navigate(`/post/${item.item.postId}`);
  };

  return (
    <SuggestedPostContainer>
      <SuggestedPostHeader>
        <div onClick={handleDiaryButton}>
          <img src={item.item.diaryProfileImage || fakeImg} alt="profile_img" />
          <div>{item.item.diaryName}</div>
        </div>
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          onDiary={handleGoToDiary}
          onUserPage={handleGoToUserPage}
        />
      </SuggestedPostHeader>
      <div>
        <img src={item.item.postImg} alt={'feed_img'} onClick={handlePostImg} />
        <PawButton>
          {!likeState ? (
            <NotLikeButton onClick={handleLikeClick} />
          ) : (
            <LikeButton onClick={handleLikeClick} />
          )}
        </PawButton>
      </div>
    </SuggestedPostContainer>
  );
};

export default SuggestedPost;
