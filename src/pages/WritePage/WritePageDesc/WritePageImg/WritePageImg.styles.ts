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

export const PreviewImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 420px;
    height: 340px;
  }
`;

export const WritePageImgContent = styled.div`
  width: 100%;
  min-height: 100px;
  border: 1px solid #cad1dc;
  background-color: #f1f3f6;
  position: relative;
  margin-top: 6px;
  box-sizing: border-box;
  padding: 0 1px;
  input {
    display: none;
  }
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
  position: absolute;
  right: 6px;
  top: 6px;
`;

export const UploadBtnIcons = styled(PiUpload)`
  width: 18px;
  height: 18px;
  color: #515e72;
  margin-right: 8px;
`;
