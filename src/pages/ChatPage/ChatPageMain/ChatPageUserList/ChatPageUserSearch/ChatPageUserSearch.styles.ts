import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

export const ChatUserSearchContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 32px 11px 32px;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  input {
    width: 100%;
    margin-right: 6px;
    height: 42px;
    border-radius: 5px;
    border: 2px solid #f6f7f8;
    background-color: white;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    padding-left: 12px;
  }
`;

export const SearchBtn = styled(IoSearch)`
  width: 24px;
  height: 24px;
  color: #8e8e8e;
`;
