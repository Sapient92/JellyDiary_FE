import React from "react";
import { SettingPageContainer, SettingPageContent } from "./SettingPage.styles";

const SettingPage = () => {
  return (
    <SettingPageContainer>
      <div>
        <div>
          <div>이미지</div>
          <div>수정버튼</div>
        </div>
        <div>
          <div>
            <div>Hello, </div>
            <div>유저이름 </div>
          </div>
          <div>유저이메일@gmail.com</div>
        </div>
        <div>
          <div>내프로필</div>
          <div>알림설정</div>
          <div>언어설정</div>
        </div>
      </div>
      <SettingPageContent>
        <div style={{ backgroundColor: "white" }}>
          <div>내프로필</div>
          <div>
            <div>
              <div>계정 이름</div>
              <input type="text" />
              <button type="button">중복 확인</button>
              <div>
                {" "}
                * 2 ~ 15 글자 대/소문자 가능, 한글 가능, 숫자 가능,
                특수문자(언더바(_),점(.))만 가능
              </div>
            </div>
            <div>
              <div>계정 소개</div>
              <textarea />
            </div>
          </div>
          <div>
            <button type="button">저장</button>
          </div>
        </div>
        <div>
          <div>
            <div>알림설정</div>
            <input type="text" placeholder="토글버튼 어떻게 만들지" />
          </div>
          <div>
            <div>게시물 좋아요</div>
            <input type="radio" />
          </div>
          <div>
            <div>게시물 댓글</div>
            <input type="radio" />
          </div>
          <div>
            <div>게시물 생성</div>
            <input type="radio" />
          </div>
          <div>
            <div>언급</div>
            <input type="radio" />
          </div>
          <div>
            <div>새로운 팔로워</div>
            <input type="radio" />
          </div>
          <div>
            <div>메시지 요청(DM)</div>
            <input type="radio" />
          </div>
          <div>
            <button type="submit">저장</button>
          </div>
        </div>
        <div>
          <div>회원탈퇴</div>
          <button type="submit">회원탈퇴</button>
        </div>
      </SettingPageContent>
    </SettingPageContainer>
  );
};

export default SettingPage;
