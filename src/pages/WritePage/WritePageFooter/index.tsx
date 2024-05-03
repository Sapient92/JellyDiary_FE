import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";

import api from "../../../api";
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import { useModalStore } from "../../../store/modalStore/modalStore.ts";
import { DiaryType } from "../../../types/diaryType.ts";

import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";
import { useImgsStore } from "../../../store/imgsStore/imgsStore.ts";

interface WritePageFooterProps {
  data: DiaryType;
}

const WritePageFooter: React.FC<WritePageFooterProps> = ({ data }) => {
  const { diary, changeValue } = useDiaryStore((state) => state);
  const { postImgs } = useImgsStore((state) => state.writeImgs);
  const toggleTitleAlertModal = useModalStore(
    (state) => state.toggleTitleAlertModal,
  );
  const { isPublic } = data || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (isPublic === false) {
      changeValue({ isPublic: false });
    }
  }, []);

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (diary.postTitle.trim() === "") {
      toggleTitleAlertModal(true);
      setTimeout(() => {
        toggleTitleAlertModal(false);
      }, 3000);
      return;
    }
    if (!data && postImgs?.length && postImgs !== null) {
      const formData = new FormData();
      for (const img of postImgs) {
        formData.append("postImgs", img);
      }
      const diaryJson = JSON.stringify(diary);
      const blob = new Blob([diaryJson], { type: "application/json" });
      formData.append("diaryPostCreateRequestDto", blob);
      api
        .post("/api/post/4", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          res.status === 200 && navigate(`../../post/${res.data.data.postId}`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleIsPublicClick = () => {
    changeValue({ isPublic: !diary.isPublic });
  };

  return (
    <WritePageFooterContainer>
      <FooterBtnContainer>
        <PrivateBtnContainer>
          <input
            id={"private_checkbox"}
            type={"checkbox"}
            checked={!diary.isPublic}
            onChange={handleIsPublicClick}
          />
          <label htmlFor={"private_checkbox"}>체크하여 비공개로 게시하기</label>
        </PrivateBtnContainer>
        <Button onClick={handlePostClick} className={"post"}>
          {data ? "수정" : "게시"}
        </Button>
      </FooterBtnContainer>
    </WritePageFooterContainer>
  );
};

export default WritePageFooter;
