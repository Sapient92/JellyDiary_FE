import {
  UploadBtn,
  UploadBtnIcons,
  WritePageImgContainer,
  WritePageImgContent,
  WritePageImgTitleContainer,
} from "./WritePageImg.styles.ts";

const WritePageImg = () => {
  return (
    <WritePageImgContainer>
      <WritePageImgTitleContainer>
        <p>사진(1/5)</p>
        <p>오늘 하루를 사진으로 기록해요.</p>
      </WritePageImgTitleContainer>
      <WritePageImgContent>
        <UploadBtn>
          <UploadBtnIcons /> 업로드
        </UploadBtn>
      </WritePageImgContent>
    </WritePageImgContainer>
  );
};

export default WritePageImg;
