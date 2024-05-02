import React, { useEffect } from "react";

import Button from "../../../components/Button";

import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import { useModalStore } from "../../../store/modalStore/modalStore.ts";
import { DiaryType } from "../../../types/diaryType.ts";

import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";

interface WritePageFooterProps {
  data: DiaryType;
}

const WritePageFooter: React.FC<WritePageFooterProps> = ({ data }) => {
  const { diary, changeValue } = useDiaryStore((state) => state);
  const toggleTitleAlertModal = useModalStore(
    (state) => state.toggleTitleAlertModal,
  );
  const { isPublic } = data || {};

  console.log(diary);

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
