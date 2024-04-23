import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";
import Button from "../../../components/Button";
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryType } from "../../../types/diaryType.ts";
import { useModalStore } from "../../../store/modalStore/modalStore.ts";

interface WritePageFooterProps {
  data: DiaryType;
}

const WritePageFooter: React.FC<WritePageFooterProps> = ({ data }) => {
  const { diary, changeValue } = useDiaryStore((state) => state);
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

  const id = useRef(5);
  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (diary.postTitle.trim() === "") {
      toggleTitleAlertModal(true);
      setTimeout(() => {
        toggleTitleAlertModal(false);
      }, 3000);
      return;
    }
    axios.post("/post", { ...diary, postId: id.current }).then((r) => r);
    axios
      .post("feed", {
        postId: id.current,
        isPublic: diary.isPublic,
        postImgIsMultiple: true,
        postImg: "",
      })
      .then(() => {
        navigate(`../../post/${id.current}`);
        id.current++;
      });
  };

  return (
    <WritePageFooterContainer>
      <FooterBtnContainer>
        <PrivateBtnContainer>
          <input
            id={"private_checkbox"}
            type={"checkbox"}
            checked={!diary.isPublic}
            onChange={() => changeValue({ isPublic: !diary.isPublic })}
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
