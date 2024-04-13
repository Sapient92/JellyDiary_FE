import styled from "styled-components";

export const SettingPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SettingPageContent = styled.div`
  width: 935px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 10px;
  color: #6b7a99;
  font-weight: 600;
  h3 {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 2vw;
  }
`;

export const SettingLeftContent = styled.div`
  width: 20vw;
  height: 80vh;
  margin-right: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vh;
  margin-top: 10px;
  gap: 0.5vh;
`;

export const UserImage = styled.div`
  width: 10vw;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5vh;

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 2px solid #dadee6;
    padding: 0.5vh;
  }

  div {
    position: relative;
    top: -40px;
    right: -50px;
    background-color: #3361ff;
    padding: 6px 6px 2px 6px;
    border-radius: 50%;
    border: 2px solid #dadee6;
    color: white;
    cursor: pointer;
  }
`;

export const UserInfo = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vh;
  padding: 0.5vh;
  margin-top: 2vh;
  div > span {
    color: #6b7a99;
    font-size: 16px;
    font-weight: 800;
  }
  div {
    color: #adb8cc;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const SettingLeftNav = styled.div`
  width: 200px;
  height: 400px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  gap: 1vh;
  padding: 1vh;
  border-radius: 15px;
  div {
    color: #7d8fb3;
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
    margin-bottom: 4px;
    cursor: pointer;
  }
`;

export const ProfileInfo = styled.div`
  width: 100%;
  background-color: white;
  height: fit-content;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const AccountName = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #f5f6f7;
  border-bottom: 1px solid #f5f6f7;
  padding: 1vh;
  gap: 10px;
  div > div {
    font-weight: 200;
    font-size: 10px;
    color: #0098fd;
  }
  input {
    margin-left: 5vw;
    height: 1.5rem;
    border: none;
    border-left: 1px solid #f5f6f7;
    &:focus {
      border: 1px solid #f5f6f7;
      outline: none;
    }
  }
  textarea {
    margin-left: 5vw;
    height: 6vh;
    width: 70%;
    border: none;
    resize: none;
    border-left: 1px solid #f5f6f7;
    &:focus {
      border: 1px solid #f5f6f7;
      outline: none;
    }
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  flex: 1;
  height: 5rem;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  padding-right: 2rem;
`;

export const UserLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleTitle = styled.div`
  display: flex;
  height: 100px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #f5f6f7;
`;

export const ToggleContent = styled.div`
  display: flex;
  height: 80px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #f5f6f7;
  > div {
    margin-left: 100px;
    margin-right: 40px;
  }
`;
