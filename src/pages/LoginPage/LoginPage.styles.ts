import styled from "styled-components";

export const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginPageContent = styled.div`
  width: 612px;
  height: 800px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 0.5em;
`;

export const LoginButton = styled.div`
  width: 376px;
  height: 56px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ddd;

  &:hover {
    cursor: pointer;
    background-color: #ccc;
  }
`;
