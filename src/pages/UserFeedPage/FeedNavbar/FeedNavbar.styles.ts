import styled from "styled-components";

export const FeedNavbarContainer = styled.nav`
  height: 53px;
  border-top: 1px solid #dbdbdb;
`;

export const FeedNavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const NavbarButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  background: none;
  border: none;
  border-top: 1px solid #262626;

  img {
    width: 12px;
    height: 12px;
    color: black;
    cursor: pointer;
  }

  p {
    padding-left: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #262626;
    cursor: pointer;
  }
`;
