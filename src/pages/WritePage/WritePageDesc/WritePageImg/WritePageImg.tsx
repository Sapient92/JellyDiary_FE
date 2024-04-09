import {
  PreviewImgContainer,
  UploadBtn,
  UploadBtnIcons,
  WritePageImgContainer,
  WritePageImgContent,
  WritePageImgTitleContainer,
} from "./WritePageImg.styles.ts";
import * as React from "react";
import { useRef, useState } from "react";

const WritePageImg = () => {
  const [postImg, setPostImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  console.log(postImg);
  const handleUploadClick = () => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  };

  const uploadImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileArr = e.target.files;
    if (fileArr) {
      setPostImg(Array.from(fileArr));
      let fileRead = new FileReader();
      fileRead.readAsDataURL(fileArr[0]);
      fileRead.onload = () => {
        if (typeof fileRead.result === "string") {
          setPreviewImg([...previewImg, fileRead.result]);
        } else {
          console.error("fileRead.result is not a string");
        }
      };
    }
  };

  return (
    <WritePageImgContainer>
      <WritePageImgTitleContainer>
        <p>사진(1/5)</p>
        <p>오늘 하루를 사진으로 기록해요.</p>
      </WritePageImgTitleContainer>
      <WritePageImgContent>
        <PreviewImgContainer>
          {previewImg.length !== 0 && (
            <img src={previewImg[0]} alt={"upload_img"} />
          )}
        </PreviewImgContainer>
        <input
          type={"file"}
          accept={"image/*"}
          ref={imgRef}
          onChange={uploadImgChange}
        />
        <UploadBtn onClick={handleUploadClick}>
          <UploadBtnIcons /> 업로드
        </UploadBtn>
      </WritePageImgContent>
    </WritePageImgContainer>
  );
};

export default WritePageImg;
