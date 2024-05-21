import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MdEdit } from 'react-icons/md';

import CustomButton from '../../../components/CustomButton';

import {
  AccountName,
  ButtonContent,
  ProfileInfo,
  DiaryEditLeftContent,
  DiaryEditLeftNav,
  DiaryEditPageContainer,
  DiaryEditPageContent,
  UserImage,
  UserInfo,
  UserLeft,
} from './DiaryEditPage.styles';

import imgSrc from '../../../assets/testImage/suggestedPostImage.png';
import api from '../../../api';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from './UserFindModal'; // 위에서 만든 모달 컴포넌트를 import
import UserList from './UserList';
interface DiaryProps {
  chatRoomId: number;
  diaryDescription: string;
  diaryId: number;
  diaryName: string;
  diaryProfileImage: string;
  isDiaryDeleted: boolean;
}
const DiaryEditPage = () => {
  const { id } = useParams();
  const scrollView = useRef<HTMLInputElement>(null);
  const [diaryData, setDiaryData] = useState<DiaryProps>();
  const [uploadedImage, setUploadedImage] = useState(imgSrc);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [userDesc, setUserDesc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diaryUserList, setDiaryUserList] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState([]);

  const navigate = useNavigate();

  const onMoveToSelect = () => {
    if (scrollView.current !== undefined && scrollView.current !== null) {
      scrollView.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onMoveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const updateProfileImage = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('diaryProfileImage', file);

    try {
      const response = await api.patch(`/api/diary/profile/img/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('다이어리 프로필 수정 완료:', response.data.message);
        window.location.reload();
      } else {
        console.error('프로필 이미지 업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류 발생:', error);
    }
  };

  const fetchDiaryProfile = async () => {
    try {
      const { data, status } = await api.get(`/api/diary/profile/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (status === 200) {
        console.log('다이어리 정보 조회 완료');
        setDiaryData(data.data);
      }
    } catch (error) {
      console.error('Error fetching diary profile:', error);
    }
  };
  useEffect(() => {
    fetchDiaryProfile();
    fetchDiaryUsers();
  }, []);

  const isValidString = (str: any) => {
    return str && str.trim() !== '';
  };
  const updateProfileDesc = async (diaryName: string, diaryDescription: string) => {
    if (!isValidString(diaryName) || !isValidString(diaryDescription)) {
      console.error('Diary name and description must not be empty.');
      return;
    }

    try {
      const response = await api.patch(`/api/diary/profile/${id}`, {
        diaryName,
        diaryDescription,
      });

      if (response.status === 200) {
        console.log('Profile description updated successfully.');
        window.location.reload();
      } else {
        console.log('Failed to update profile description:', response.status);
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    updateProfileImage(file);
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setUserName(value);
    setIsButtonDisabled(!isValidString(value));
  };

  const handleDescriptionChange = (e: any) => {
    const { value } = e.target;
    setUserDesc(value);
    setIsButtonDisabled(!isValidString(value));
  };

  const handleDiaryDelete = async () => {
    const response = await api.delete(`/api/diary/profile/${id}`);
    if (response.status === 200) {
      navigate('/diary');
    }
  };
  const handleUserAdd = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const fetchDiaryUsers = async () => {
    const response = await api.get(`/api/diary/user/list/${id}`);
    setDiaryUserList(response.data.data);
  };

  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`/api/diary/user/${userId}`);
      setDiaryUserList(diaryUserList.filter((user: any) => user?.diaryUserId !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleRoleChange = (diaryUserId: any, newRole: any) => {
    setUpdatedRoles((prevRoles: any) => ({
      ...prevRoles,
      [diaryUserId]: newRole,
    }));
  };

  const handleSaveRoles = async () => {
    const rolesToUpdate = Object.keys(updatedRoles).map((diaryUserId: any) => ({
      diaryUserId: parseInt(diaryUserId),
      diaryRole: updatedRoles[diaryUserId],
    }));

    console.log(rolesToUpdate);
    try {
      const response = await api.patch(`/api/diary/user/list/${id}`, rolesToUpdate);

      if (response.status === 200) {
        console.log('Roles updated successfully');
        setUpdatedRoles([]);
        fetchDiaryUsers(); // Refresh the list to show updated roles
      } else {
        console.error('Failed to update roles:', response.status);
      }
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  };

  return (
    <DiaryEditPageContainer>
      <DiaryEditLeftContent>
        <UserImage>
          {diaryData?.diaryProfileImage && (
            <img src={diaryData.diaryProfileImage} alt="userImage" />
          )}
          {!diaryData?.diaryProfileImage && <img src={uploadedImage} alt="userImage" />}
          <div>
            <label htmlFor="file">
              <MdEdit />
            </label>
            <input
              type={'file'}
              name="file"
              id="file"
              accept={'image/*'}
              multiple={false}
              onChange={onChangeImage}
              style={{ display: 'none' }}
            />
          </div>
        </UserImage>
        <UserInfo>
          <div>
            <span>{diaryData?.diaryName} </span>
          </div>
          <div>{diaryData?.diaryDescription}</div>
        </UserInfo>
        <DiaryEditLeftNav>
          <div onClick={onMoveToTop}>다이어리 프로필</div>
          <div onClick={onMoveToSelect}>다이어리 유저 설정</div>
          <div>다이어리 삭제</div>
        </DiaryEditLeftNav>
      </DiaryEditLeftContent>
      <DiaryEditPageContent>
        <ProfileInfo>
          <h3>다이어리 프로필</h3>
          <div>
            <AccountName>
              <div>다이어리 이름</div>
              <input
                type="text"
                value={userName}
                placeholder={diaryData?.diaryName}
                onChange={handleInputChange}
              />
              <div>
                <div>* 2 ~ 15 글자 대/소문자 가능, 한글 가능, 숫자 가능</div>
                <div>특수문자(언더바(_),점(.))만 가능</div>
              </div>
            </AccountName>
            <AccountName>
              <div>다이어리 소개</div>
              <textarea
                placeholder={diaryData?.diaryDescription}
                value={userDesc}
                onChange={handleDescriptionChange}
              />
            </AccountName>
          </div>
          <ButtonContent>
            <CustomButton
              text="수정"
              backgroundColor="blue"
              disabled={isButtonDisabled}
              onClick={() => updateProfileDesc(userName, userDesc)}
            />
          </ButtonContent>
        </ProfileInfo>
        <ProfileInfo>
          <UserLeft>
            <h3>참여자 관리</h3>
            <ButtonContent>
              <CustomButton
                text="저장"
                backgroundColor="blue"
                disabled={false}
                onClick={handleSaveRoles}
              />
            </ButtonContent>
          </UserLeft>
          <div>
            <UserList
              diaryUserList={diaryUserList}
              onRoleChange={handleRoleChange}
              onEdit={handleSaveRoles}
              onDelete={() => handleDelete}
            />
          </div>
          <h2 onClick={handleUserAdd}>
            <span>
              <AiFillPlusCircle />
            </span>
            참여자 추가
          </h2>
          <Modal id={id} isOpen={isModalOpen} onClose={handleCloseModal} />
        </ProfileInfo>

        <ProfileInfo>
          <UserLeft>
            <h3>다이어리 삭제</h3>
            <ButtonContent>
              <CustomButton
                text="삭제"
                backgroundColor="red"
                disabled={false}
                onClick={handleDiaryDelete}
              />
            </ButtonContent>
          </UserLeft>
        </ProfileInfo>
      </DiaryEditPageContent>
    </DiaryEditPageContainer>
  );
};

export default DiaryEditPage;
