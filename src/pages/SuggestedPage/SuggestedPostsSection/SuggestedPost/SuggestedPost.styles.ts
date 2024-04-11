import styled from "styled-components";

export const SuggestedPostContainer = styled.article`
  margin: 9px;
  box-shadow: 1px 4px 4px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  img {
    width: 292px;
    height: 292px;
  }
`;

export const SuggestedPostHeader = styled.div`
  height: 3rem;
  align-items: center;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  img {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    cursor: pointer;
  }
`;

export const UserButton = styled.div`
  padding-top: 0.5rem;
  flex-direction: column;
`;

export const PawButton = styled.div`
  position: absolute;
  margin-top: -2rem;
  margin-left: 1rem;
  cursor: pointer;
  font-size: large;
`;
