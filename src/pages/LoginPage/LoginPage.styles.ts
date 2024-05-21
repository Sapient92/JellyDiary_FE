import styled from 'styled-components';

export const LogoContainer = styled.div`
  height: 100px;
  img {
    height: 3rem;
  }
`;
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

export const ContractContent = styled.div`
  color: gray;
  display: flex;
  flex-direction: column;
  text-align: center;
  vertical-align: middle;
  div {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`;
