import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
}

interface UserProfile {
  userProfileImg: string;
  userName: string;
}

interface UserListProps {
  diaryUserList: DiaryUser[];
  onRoleChange: (diaryUserId: string, newRole: 'READ' | 'WRITE') => void;
  onEdit: (diaryUserId: string) => void;
  onDelete: (diaryUserId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ diaryUserList, onRoleChange, onEdit, onDelete }) => {
  const [userProfiles, setUserProfiles] = useState<{ [key: string]: UserProfile }>({});

  const handleRoleChange = (diaryUserId: string, newRole: 'READ' | 'WRITE') => {
    onRoleChange(diaryUserId, newRole);
  };

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
      {diaryUserList?.map((user) => {
        const profile = userProfiles[user.diaryUserId];
        return (
          <UserItem key={user.diaryUserId}>
            {profile ? (
              <UserInfo>
                <img
                  src={profile.userProfileImg || fakeImg}
                  alt={`${profile.userName}'s profile`}
                />
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
                  onChange={(e) =>
                    handleRoleChange(user.diaryUserId, e.target.value as 'READ' | 'WRITE')
                  }
                >
                  {user.diaryRole === 'READ' ? (
                    <>
                      <option value="READ" selected>
                        읽기
                      </option>
                      <option value="WRITE">읽기 쓰기</option>
                    </>
                  ) : (
                    <>
                      <option value="READ">읽기</option>
                      <option value="WRITE" selected>
                        읽기 쓰기
                      </option>
                    </>
                  )}
                </Select>
                <Button onClick={() => onEdit(user.diaryUserId)}>수정</Button>
                <Button onClick={() => onDelete(user.diaryUserId)}>삭제</Button>
              </UserActions>
            )}
          </UserItem>
        );
      })}
    </UserListContainer>
  );
};

export default UserList;
