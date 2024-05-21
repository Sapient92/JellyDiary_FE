import styled from 'styled-components';

export const DiaryPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DiaryPageContent = styled.div`
  width: 935px;

  background-color: white;
  margin: 0.5rem;
  padding: 0.5em;
  margin-top: 10px;
  .fc-theme-standard .fc-scrollgrid {
    border: 0px;
    border-bottom: 1px solid #f5f6f7;
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
    border-top: 1px solid #f5f6f7;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #6b7a99;
  }
  --fc-today-bg-color: #f5f6f8;
  .fc .fc-daygrid-day-top {
    flex-direction: row;
  }
  .fc-h-event .fc-event-main {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #3ea9e5;
    border-radius: 2px;
    background-color: white;
    color: #6b7a99;
    b {
      background-color: #3ea9e5;
      padding-top: 3px;
      border-radius: 2px;
      padding-left: 3px;
      padding-right: 3px;
      color: #fff;
    }
    a {
      padding-top: 3px;
    }
  }
  .fc-toolbar-chunk {
    h2 {
      font-size: 16px;
      padding: 0.5rem;
      color: #6b7a99;
      padding-top: 0.5rem;
      display: inline-flex;
      justify-content: center;
    }
    button {
      background-color: #ffffff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #f5f6f7;
      color: #3ea9e5;
      box-shadow: 1px 1px 1px 0.1px rgba(0, 0, 0, 0.2);
      padding-top: 5px;
      padding-left: 5px;
      padding-right: 5px;
      &:hover {
        background-color: #3ea9e5;
        color: white;
        border: 1px solid #3ea9e5;
      }
      --fc-button-active-bg-color: #3ea9e5;
      &:focus {
        border: 1px solid #3ea9e5;
      }
    }
  }
`;

export const DiaryLeftContent = styled.div`
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
  margin-top: 4vh;
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

export const DiaryLeftNav = styled.div`
  width: 250px;
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

export const UserList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  height: 70%;
  overflow-y: auto;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      background-color: #f5f6f9;
    }
  }
  div > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #dadee6;
  }
`;

export const AddUser = styled.div`
  width: 90%;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3797ef;
    gap: 10px;
  }
`;

export const ListContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DiaryRightNav = styled.div`
  z-index: 2;
  position: fixed;
  top: 40%;
  right: 10px;
  padding: 10px;
  background-color: #fff;
  height: 200px;
  width: 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
  flex-direction: column;

  div {
    overflow-y: auto;
    scrollbar-width: none;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
`;
export const GroupIcon = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 50%;
  border: 2px solid white;
  background-color: #3797ef;
  box-shadow: 1px 1px 1px 0.1px rgba(0, 0, 0, 0.2);
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  span {
    font-size: x-small;
  }
`;
