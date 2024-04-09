import styled from "styled-components";
import { PiUpload } from "react-icons/pi";

export const WritePageImgContainer = styled.div``;

export const WritePageImgTitleContainer = styled.div`
  p:nth-child(1) {
    color: black;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0;
  }
  p:nth-child(2) {
    color: #515e72;
    font-size: 14px;
    margin: 0;
  }
`;

export const WritePageImgContent = styled.div`
  width: 100%;
  min-height: 100px;
  border: 1px solid #cad1dc;
`;

export const UploadBtn = styled.button`
  display: flex;
  align-items: center;
  color: #515e72;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #cad1dc;
  background-color: white;
  cursor: pointer;
`;

export const UploadBtnIcons = styled(PiUpload)`
  width: 18px;
  height: 18px;
  color: #515e72;
  margin-right: 8px;
`;
