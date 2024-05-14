import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { UserImageContainer, UserImage } from './UserImageList.styles';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser';

const UserImageList = ({ userIds }) => {
  const [userInfos, setUserInfos] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();
  const fetchUserInfo = async (userId) => {
    try {
      const response = await api.get(`/api/feed/userInfo/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  // 사용자 정보를 가져와 상태에 저장하는 함수
  const fetchUserInfos = async () => {
    const infos = await Promise.all(
      userIds.map(async (userId) => {
        const userInfo = await fetchUserInfo(userId);
        return userInfo
          ? { userId, profileImg: userInfo.profileImg, userName: userInfo.userName }
          : null;
      }),
    );
    setUserInfos(infos.filter((info) => info !== null)); // null 값 제거
  };

  useEffect(() => {
    fetchUserInfos();
  }, [userIds]);

  const handlePersonalChat = (userId, userName) => {
    if (userId === user?.userId) return;
    navigate(`/chat/${userId}?roomName=${userName}`);
  };

  return (
    <UserImageContainer>
      {userInfos.map((userInfo) => (
        <UserImage
          key={userInfo.userId}
          src={userInfo.profileImg}
          alt={`User ${userInfo.userName}`}
          onClick={() => handlePersonalChat(userInfo.userId, userInfo.userName)}
        />
      ))}
    </UserImageContainer>
  );
};

export default UserImageList;
