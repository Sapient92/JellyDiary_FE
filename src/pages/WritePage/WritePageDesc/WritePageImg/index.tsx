import React, { useEffect, useRef, useState } from "react";

import { useModalStore } from "../../../../store/modalStore/modalStore.ts";

import {
  ImgDeleteButton,
  PreviewImgBox,
  PreviewImgContainer,
  UploadBtn,
  UploadBtnIcons,
  WritePageImgContainer,
  WritePageImgContent,
  WritePageImgTitleContainer,
} from "./WritePageImg.styles.ts";
import { useImgsStore } from "../../../../store/imgsStore/imgsStore.ts";

interface BeforeImgsProps {
  diaryPostImg: string;
  imgId: number;
}

interface WritePageImgProps {
  postImgs?: BeforeImgsProps[] | null | undefined;
}

const WritePageImg: React.FC<WritePageImgProps> = ({ postImgs }) => {
  const [postList, setPostList] = useState<
    { id: number; previewUrl: string; origin: File }[]
  >([]);
  const [previewList, setPreviewList] = useState<
    { id: number; previewUrl: string }[]
  >([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const { toggleImageAlertModal, toggleImgDupliAlertModal } = useModalStore();
  const { addedDeleteImgIds, changeImgs, changeAddedImgs } = useImgsStore(
    (state) => state,
  );

  useEffect(() => {
    if (postImgs) {
      const previewList = postImgs.map((post) => {
        return {
          id: post.imgId,
          previewUrl: post.diaryPostImg,
        };
      });
      setPreviewList(previewList);
    }
  }, []);

  const handleUploadClick = () => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  };

  const prevImg = postList.map((post) => post.origin.name);

  const uploadImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;
    if (fileArr) {
      const newFilesArray = Array.from(fileArr);
      newFilesArray.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (
            typeof fileReader.result === "string" &&
            !prevImg.includes(file.name) &&
            previewList.length + newFilesArray.length <= 5
          ) {
            if (!postImgs) {
              changeImgs([file]);
            } else {
              changeAddedImgs([file]);
            }
            setPostList((prev) => [
              ...prev,
              {
                id: file.lastModified,
                previewUrl: fileReader.result as string,
                origin: file,
              },
            ]);
            setPreviewList((prev) => {
              return [
                ...prev,
                {
                  id: file.lastModified,
                  previewUrl: fileReader.result as string,
                },
              ];
            });
          } else if (prevImg.includes(file.name)) {
            toggleImgDupliAlertModal(true);
            setTimeout(() => {
              toggleImgDupliAlertModal(false);
            }, 3000);
          } else {
            toggleImageAlertModal(true);
            setTimeout(() => {
              toggleImageAlertModal(false);
            }, 3000);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    e.target.value = "";
  };

  const handleLeftClick = () => {
    const imgContainer = document.getElementById("imgContainer")!;
    const maxScrollLeft = imgContainer.scrollWidth - imgContainer.clientWidth;
    if (imgContainer.scrollLeft === 0) {
      imgContainer.scrollLeft = maxScrollLeft;
    } else {
      document.getElementById("imgContainer")!.scrollLeft -= 420;
    }
  };

  const handleRightClick = () => {
    const imgContainer = document.getElementById("imgContainer")!;
    const maxScrollLeft = imgContainer.scrollWidth - imgContainer.clientWidth;
    if (imgContainer.scrollLeft >= maxScrollLeft) {
      imgContainer.scrollLeft = 0;
    } else {
      document.getElementById("imgContainer")!.scrollLeft += 420;
    }
  };

  const handleImgDeleteClick = (id: number) => {
    const newPostList = postList.filter((post) => post.id !== id);
    const newOriginList = newPostList.map((post) => post.origin);
    setPostList(newPostList);
    const newPreviewList = previewList.filter((post) => post.id !== id);
    setPreviewList(newPreviewList);
    const beforeImgsId = postImgs?.map((img) => img.imgId);
    if (beforeImgsId?.includes(id)) {
      addedDeleteImgIds(id);
    }
    if (!postImgs) {
      changeImgs(newOriginList, true);
    } else if (postImgs && !beforeImgsId?.includes(id)) {
      changeAddedImgs(newOriginList, true);
    }
  };

  return (
    <WritePageImgContainer>
      <WritePageImgTitleContainer>
        <p>사진({previewList.length}/5)</p>
        <p>오늘 하루를 사진으로 기록해요.</p>
      </WritePageImgTitleContainer>
      <WritePageImgContent>
        {previewList.length >= 2 && (
          <span onClick={handleLeftClick}>{"<"}</span>
        )}
        <PreviewImgContainer id={"imgContainer"}>
          {previewList.length !== 0 &&
            previewList.map((post) => (
              <PreviewImgBox key={post.id}>
                <img src={post.previewUrl} alt={"uploadImg"} />
                <ImgDeleteButton
                  onClick={() => handleImgDeleteClick(post.id)}
                />
              </PreviewImgBox>
            ))}
        </PreviewImgContainer>
        {previewList.length >= 2 && (
          <span onClick={handleRightClick}>{">"}</span>
        )}
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
