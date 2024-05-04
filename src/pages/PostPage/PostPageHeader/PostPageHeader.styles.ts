import styled from "styled-components";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { PiNotebookLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export const PostPageHeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    width: 42px;
    height: 42px;
  }
`;

export const LinkTag = styled(Link)`
  margin: 0 0 0 14px;
  text-decoration: none;
  color: black;
  p {
    margin: 0;
    font-weight: 600;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PostMenuButton = styled.button`
  margin-right: 10px;
  background: none;
  border: none;
`;

export const EditButtonContainer = styled.div`
  position: relative;
`;

export const EditButton = styled(HiOutlineDotsHorizontal)`
  margin-right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const DiaryButton = styled(PiNotebookLight)`
  font-size: 32px;
  cursor: pointer;
`;
