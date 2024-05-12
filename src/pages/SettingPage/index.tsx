import React, { useRef } from 'react';
import { MdEdit } from 'react-icons/md';

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

const SettingPage = () => {
  const scrollView = useRef<HTMLInputElement>(null);
  const { user } = useUser();
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

  if (!user) {
    return <div>...</div>;
  }

  return (
    <SettingPageContainer>
      <SettingLeftContent>
        <UserImage>
          <img src={imgSrc} alt="userImage" />
          <div>
            <MdEdit />
          </div>
        </UserImage>
        <UserInfo>
          <div>
            <span>Hello, </span>
            <span>{user?.userName} </span>
          </div>
          <div>{user?.userDesc}</div>
        </UserInfo>
        <SettingLeftNav>
          <div onClick={onMoveToTop}>내프로필</div>
          <div onClick={onMoveToSelect}>알림설정</div>
          <div>언어설정</div>
        </SettingLeftNav>
      </SettingLeftContent>
      <SettingPageContent>
        <ProfileInfo>
          <h3>내프로필</h3>
          <div>
            <AccountName>
              <div>계정 이름</div>
              <input type="text" placeholder={user?.userName} />
              <CustomButton
                text="중복 확인"
                backgroundColor="blue"
                onClick={() => console.log('사용 가능한 계정 이름입니다.')}
                disabled={true}
              />
              <div>
                <div>* 2 ~ 15 글자 대/소문자 가능, 한글 가능, 숫자 가능</div>
                <div>특수문자(언더바(_),점(.))만 가능</div>
              </div>
            </AccountName>
            <AccountName>
              <div>계정 소개</div>
              <textarea placeholder={user?.userDesc} />
            </AccountName>
          </div>
          <ButtonContent>
            <CustomButton
              text="저장"
              backgroundColor="blue"
              disabled={false}
              onClick={() => console.log('계정 정보가 저장되었습니다.')}
            />
          </ButtonContent>
        </ProfileInfo>
        <ProfileInfo ref={scrollView}>
          <ToggleTitle>
            <h3>알림설정</h3>
            <ButtonContent>
              <ToggleButton state={user?.notificationSetting} />
            </ButtonContent>
          </ToggleTitle>
          <ToggleContent>
            <div>게시물 좋아요</div>
            <ButtonContent>
              <ToggleButton state={user?.postLike} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>게시물 댓글</div>
            <ButtonContent>
              <ToggleButton state={user?.postComment} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>게시물 생성</div>
            <ButtonContent>
              <ToggleButton state={user?.postCreated} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>언급</div>
            <ButtonContent>
              <ToggleButton state={user?.commentTag} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>새로운 팔로워</div>
            <ButtonContent>
              <ToggleButton state={user?.newFollower} />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>메시지 요청(DM)</div>
            <ButtonContent>
              <ToggleButton state={user.dm} />
            </ButtonContent>
          </ToggleContent>
          <ButtonContent>
            <CustomButton
              text="저장"
              backgroundColor="blue"
              disabled={false}
              onClick={() => console.log('알림이 설정되었습니다..')}
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
                onClick={() => console.log('알림이 설정되었습니다..')}
              />
            </ButtonContent>
          </UserLeft>
        </ProfileInfo>
      </SettingPageContent>
    </SettingPageContainer>
  );
};

export default SettingPage;
