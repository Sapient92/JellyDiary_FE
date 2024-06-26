import { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomButton from '../../components/CustomButton';
import ToggleButton from '../../components/ToggleButton';

import {
  AccountName,
  ButtonContent,
  ProfileInfo,
  SettingLeftContent,
  SettingLeftNav,
  SettingPageContainer,
  SettingPageContent,
  ToggleContent,
  ToggleTitle,
  UserImage,
  UserInfo,
  UserLeft,
} from './SettingPage.styles';

import imgSrc from '../../assets/testImage/suggestedPostImage.png';
import useUser from '../../hooks/useUser';
import api from '../../api';
import { useNotificationStore } from '../../store/notificationStore/notificationStore';
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const scrollView = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState('');
  const [IsButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [userDesc, setUserDesc] = useState('');

  const {
    notificationSetting,
    subscribe,
    postLike,
    postComment,
    post,
    diary,
    commentTag,
    newFollower,
    dm,
  } = useNotificationStore((state) => state);

  const [settings, setSettings] = useState({
    notificationSetting,
    subscribe,
    postLike,
    postComment,
    post,
    diary,
    commentTag,
    newFollower,
    dm,
  });
  useEffect(() => {
    if (user) {
      setSettings({
        notificationSetting: user.notificationSetting,
        subscribe: user.subscribe,
        postLike: user.postLike,
        postComment: user.postComment,
        post: user.post,
        diary: user.diary,
        commentTag: user.commentTag,
        newFollower: user.newFollower,
        dm: user.dm,
      });
      setUploadedImage(user.profileImg);
      setUserName(user.userName);
      setUserDesc(user.userDesc);
    }
  }, [user]);
  useEffect(() => {
    setSettings({
      notificationSetting,
      subscribe,
      postLike,
      postComment,
      post,
      diary,
      commentTag,
      newFollower,
      dm,
    });
  }, [
    notificationSetting,
    subscribe,
    postLike,
    postComment,
    post,
    diary,
    commentTag,
    newFollower,
    dm,
  ]);

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
    formData.append('newProfileImg', file);

    try {
      const response = await api.patch('/api/users/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast(response.data.message);
      } else {
        console.error('프로필 이미지 업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류 발생:', error);
    }
  };
  const updateProfileDesc = async (userName: string, userDescription: string) => {
    try {
      const response = await api.patch('/api/users/profile', {
        userName,
        userDescription,
      });

      if (response.status === 200) {
        toast('저장되었습니다.');
        setIsButtonDisabled(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log('Failed to update profile description:', response.status);
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error respo123nse:', error.response.data.data);
        toast(error.response.data.data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setIsButtonDisabled(!e.target.value);
  };

  const checkUserName = async (userName: string) => {
    try {
      const response = await api.post('/api/users/profile/ckeckUserName', {
        userName,
      });
      if (response.data.statusCode === 200) {
        toast(response.data.message);
        setIsButtonDisabled(false);
      } else if (response.data.statusCode === 409) {
        toast(response.data.data);
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.log(error);
      toast('사용할 수 없는 이름입니다.');
      setIsButtonDisabled(true);
    }
  };

  const handleCheckClick = () => {
    checkUserName(userName);
  };

  const updateSettings = async () => {
    try {
      const response = await api.patch('/api/users/profile/notifications', settings);
      if (response.status === 200) {
        toast('알람이 설정되었습니다.');
      } else {
        console.error('Failed to update settings:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };
  const handleToggle = (settingName: string) => {
    if (settingName === 'notificationSetting' && settings.notificationSetting === true) {
      setSettings({
        notificationSetting: false,
        subscribe: false,
        postLike: false,
        postComment: false,
        post: false,
        diary: false,
        commentTag: false,
        newFollower: false,
        dm: false,
      });
    } else {
      setSettings((prevSettings: any) => ({
        ...prevSettings,
        [settingName]: !prevSettings[settingName],
      }));
    }
  };
  if (!user) {
    return <div>...</div>;
  }
  const handleUserDelete = async () => {
    const response = await api.delete('/api/users');
    if (response.status === 200) {
      toast('회원 탈퇴 완료');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  return (
    <SettingPageContainer>
      <SettingLeftContent>
        <UserImage>
          <img src={uploadedImage || imgSrc} alt="userImage" />
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
            <span>{user?.userName} </span>
          </div>
          <div>{user?.userDesc}</div>
        </UserInfo>
        <SettingLeftNav>
          <div onClick={onMoveToTop}>내프로필</div>
          <div onClick={onMoveToSelect}>알림설정</div>
        </SettingLeftNav>
      </SettingLeftContent>
      <SettingPageContent>
        <ProfileInfo>
          <h3>내프로필</h3>
          <div>
            <AccountName>
              <div>계정 이름</div>
              <input
                type="text"
                placeholder={user?.userName}
                value={userName}
                onChange={handleInputChange}
              />
              <div>
                <CustomButton
                  text="중복 확인"
                  backgroundColor="blue"
                  onClick={handleCheckClick}
                  disabled={IsButtonDisabled}
                />
              </div>
              <div>
                <div>* 2 ~ 15 글자 대/소문자 가능, 한글 가능, 숫자 가능</div>
                <div>특수문자(언더바(_),점(.))만 가능</div>
              </div>
            </AccountName>
            <AccountName>
              <div>계정 소개</div>
              <textarea
                placeholder={user?.userDesc}
                value={userDesc}
                onChange={(e) => setUserDesc(e.target.value)}
              />
            </AccountName>
          </div>
          <ButtonContent>
            <CustomButton
              text="저장"
              backgroundColor="blue"
              disabled={IsButtonDisabled}
              onClick={() => updateProfileDesc(userName, userDesc)}
            />
            <ToastContainer />
          </ButtonContent>
        </ProfileInfo>
        <ProfileInfo ref={scrollView}>
          <ToggleTitle>
            <h3>알림설정</h3>
            <ButtonContent>
              <ToggleButton
                state={settings.notificationSetting}
                toggle={() => handleToggle('notificationSetting')}
              />
            </ButtonContent>
          </ToggleTitle>
          <ToggleContent>
            <div>구독</div>
            <ButtonContent>
              <ToggleButton state={settings.subscribe} toggle={() => handleToggle('subscribe')} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>게시물 좋아요</div>
            <ButtonContent>
              <ToggleButton state={settings.postLike} toggle={() => handleToggle('postLike')} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>댓글</div>
            <ButtonContent>
              <ToggleButton
                state={settings.postComment}
                toggle={() => handleToggle('postComment')}
              />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>게시물 생성</div>
            <ButtonContent>
              <ToggleButton state={settings.post} toggle={() => handleToggle('post')} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>다이어리</div>
            <ButtonContent>
              <ToggleButton state={settings.diary} toggle={() => handleToggle('diary')} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>언급</div>
            <ButtonContent>
              <ToggleButton state={settings.commentTag} toggle={() => handleToggle('commentTag')} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>새로운 팔로워</div>
            <ButtonContent>
              <ToggleButton
                state={settings.newFollower}
                toggle={() => handleToggle('newFollower')}
              />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>메시지</div>
            <ButtonContent>
              <ToggleButton state={settings.dm} toggle={() => handleToggle('dm')} />
            </ButtonContent>
          </ToggleContent>
          <ButtonContent>
            <CustomButton
              text="저장"
              backgroundColor="blue"
              disabled={false}
              onClick={updateSettings}
            />
          </ButtonContent>
        </ProfileInfo>
        <ProfileInfo>
          <UserLeft>
            <h3>회원탈퇴</h3>
            <ButtonContent>
              <CustomButton
                text="회원 탈퇴"
                backgroundColor="red"
                disabled={false}
                onClick={() => handleUserDelete()}
              />
            </ButtonContent>
          </UserLeft>
        </ProfileInfo>
      </SettingPageContent>
    </SettingPageContainer>
  );
};

export default SettingPage;
