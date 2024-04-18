import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";
import Button from "../../../components/Button/Button.tsx";
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const WritePageFooter = () => {
  const { diary, changeValue } = useDiaryStore((state) => state);
  const navigate = useNavigate();
  const id = useRef(5);
  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          게시
        </Button>
      </FooterBtnContainer>
    </WritePageFooterContainer>
  );
};

export default WritePageFooter;
