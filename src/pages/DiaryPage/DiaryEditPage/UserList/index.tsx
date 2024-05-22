import React, { useState, useEffect } from 'react';
import {
  UserListContainer,
  UserItem,
  UserInfo,
  UserActions,
  Select,
  Button,
} from './UserList.styles';
import fakeImg from '../../../../assets/images/UserAvatar.png';
import api from '../../../../api';

interface DiaryUser {
  diaryUserId: string;
  userId: string;
  diaryRole: 'READ' | 'WRITE' | 'CREATOR';
  isInvited: boolean;
}

interface UserProfile {
  profileImg: string;
  userName: string;
}

interface UserListProps {
  diaryUserList: DiaryUser[];
  onRoleChange: (diaryUserId: string, newRole: 'READ' | 'WRITE') => void;
  onDelete: (diaryUserId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ diaryUserList, onRoleChange, onDelete }) => {
  const [userProfiles, setUserProfiles] = useState<{ [key: string]: UserProfile }>({});

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profiles: { [key: string]: UserProfile } = {};
      for (const user of diaryUserList) {
        const response = await api.get(`/api/feed/userInfo/${user.userId}`);
        profiles[user.diaryUserId] = response.data.data;
      }
      setUserProfiles(profiles);
    };

    if (diaryUserList && diaryUserList.length > 0) {
      fetchUserProfiles();
    }
  }, [diaryUserList]);

  return (
    <UserListContainer>
      {diaryUserList
        ?.filter((user) => user.isInvited === true)
        .map((user) => {
          const profile = userProfiles[user.diaryUserId];
          return (
            <UserItem key={user.diaryUserId}>
              {profile ? (
                <UserInfo>
                  <img src={profile.profileImg || fakeImg} alt={`${profile.userName}'s profile`} />
                  <b>{profile.userName}</b>
                </UserInfo>
              ) : (
                <UserInfo>
                  <b>ID:</b> {user.diaryUserId}
                </UserInfo>
              )}
              {user.diaryRole !== 'CREATOR' && (
                <UserActions>
                  <Select
                    value={user.diaryRole}
                    onChange={(e) =>
                      onRoleChange(user.diaryUserId, e.target.value as 'READ' | 'WRITE')
                    }
                  >
                    <option value="READ">읽기</option>
                    <option value="WRITE">읽기 쓰기</option>
                  </Select>
                  <Button onClick={() => onDelete(user.diaryUserId)}>삭제</Button>
                </UserActions>
              )}
            </UserItem>
          );
        })}
      {diaryUserList
        ?.filter((user) => user.isInvited === false)
        .map((user) => {
          const profile = userProfiles[user.diaryUserId];

          return (
            <UserItem key={user.diaryUserId}>
              {profile ? (
                <UserInfo>
                  <img src={profile.profileImg || fakeImg} alt={`${profile.userName}'s profile`} />
                  <b>{profile.userName}</b>
                  <b>수락 대기중</b>
                </UserInfo>
              ) : (
                <UserInfo>
                  <b>ID:</b> {user.diaryUserId}
                </UserInfo>
              )}
            </UserItem>
          );
        })}
    </UserListContainer>
  );
};

export default UserList;
