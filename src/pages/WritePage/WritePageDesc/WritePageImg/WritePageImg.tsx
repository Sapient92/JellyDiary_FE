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
  const [postList, setPostList] = useState<
    { id: number; previewUrl: string; origin: File }[]
  >([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  };

  const uploadImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileArr = e.target.files;
    if (fileArr) {
      const newFilesArray = Array.from(fileArr);
      newFilesArray.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (typeof fileReader.result === "string") {
            setPostList((prev) => [
              ...prev,
              {
                id: file.lastModified,
                previewUrl: fileReader.result as string,
                origin: file,
              },
            ]);
          } else {
            console.error("fileRead.result is not a string");
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const handleLeftClick = () => {
    document.getElementById("imgContainer")!.scrollLeft -= 420;
  };

  const handleRightClick = () => {
    document.getElementById("imgContainer")!.scrollLeft += 420;
  };

  return (
    <WritePageImgContainer>
      <WritePageImgTitleContainer>
        <p>사진({postList.length}/5)</p>
        <p>오늘 하루를 사진으로 기록해요.</p>
      </WritePageImgTitleContainer>
      <WritePageImgContent>
        {postList.length >= 2 && <span onClick={handleLeftClick}>{"<"}</span>}
        <PreviewImgContainer id={"imgContainer"}>
          {postList.length !== 0 &&
            postList.map((post) => (
              <img key={post.id} src={post.previewUrl} alt={"uploadImg"} />
            ))}
        </PreviewImgContainer>
        {postList.length >= 2 && <span onClick={handleRightClick}>{">"}</span>}
        <input
          type={"file"}
          accept={"image/*"}
          multiple={true}
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
