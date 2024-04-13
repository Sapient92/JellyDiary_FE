import React from "react";
import {
  SettingPageContainer,
  SettingPageContent,
  SettingLeftContent,
  UserImage,
  UserInfo,
  SettingLeftNav,
  ProfileInfo,
  AccountName,
  ButtonContent,
  UserLeft,
  ToggleTitle,
  ToggleContent,
} from "./SettingPage.styles";
import CustomButton from "../../components/Button/CustomButton/CustomButton";
import imgSrc from "../../assets/testImage/suggestedPostImage.png";
import { MdEdit } from "react-icons/md";
import ToggleButton from "../../components/Button/ToggleButton/ToggleButton";

const SettingPage = () => {
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
            <span>유저이름 </span>
          </div>
          <div>유저이메일@gmail.com</div>
        </UserInfo>
        <SettingLeftNav>
          <div>내프로필</div>
          <div>알림설정</div>
          <div>언어설정</div>
        </SettingLeftNav>
      </SettingLeftContent>
      <SettingPageContent>
        <ProfileInfo>
          <h3>내프로필</h3>
          <div>
            <AccountName>
              <div>계정 이름</div>
              <input type="text" />
              <CustomButton
                text="중복 확인"
                backgroundColor="blue"
                onClick={() => console.log("사용 가능한 계정 이름입니다.")}
                disabled={true}
              />
              <div>
                <div>* 2 ~ 15 글자 대/소문자 가능, 한글 가능, 숫자 가능</div>
                <div>특수문자(언더바(_),점(.))만 가능</div>
              </div>
            </AccountName>
            <AccountName>
              <div>계정 소개</div>
              <textarea />
            </AccountName>
          </div>
          <ButtonContent>
            <CustomButton
              text="저장"
              backgroundColor="blue"
              disabled={false}
              onClick={() => console.log("계정 정보가 저장되었습니다.")}
            />
          </ButtonContent>
        </ProfileInfo>
        <ProfileInfo>
          <ToggleTitle>
            <h3>알림설정</h3>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleTitle>
          <ToggleContent>
            <div>게시물 좋아요</div>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>게시물 댓글</div>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>게시물 생성</div>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>언급</div>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>새로운 팔로워</div>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleContent>
          <ToggleContent>
            <div>메시지 요청(DM)</div>
            <ButtonContent>
              <ToggleButton />
            </ButtonContent>
          </ToggleContent>
          <ButtonContent>
            <CustomButton
              text="저장"
              backgroundColor="blue"
              disabled={false}
              onClick={() => console.log("알림이 설정되었습니다..")}
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
                onClick={() => console.log("알림이 설정되었습니다..")}
              />
            </ButtonContent>
          </UserLeft>
        </ProfileInfo>
      </SettingPageContent>
    </SettingPageContainer>
  );
};

export default SettingPage;
