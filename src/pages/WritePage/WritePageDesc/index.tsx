import React, { useEffect, useRef } from "react";

import WritePageImg from "./WritePageImg";

import { usePostInputStore } from "../../../store/postStore/postStore.ts";
import { useModalStore } from "../../../store/modalStore/modalStore.ts";
import { PostType } from "../../../types/postType.ts";

import {
  DiaryDateContainer,
  DiaryTitleContainer,
  WritePageDescContainer,
  WritePageDetailContainer,
} from "./WritePageDesc.styles.ts";

interface WritePageDescProps {
  data?: PostType;
}

const today = new Date().toISOString().split("T")[0];

const WritePageDesc: React.FC<WritePageDescProps> = ({ data }) => {
  const { postTitle, postDate, postContent } = usePostInputStore(
    (state) => state.post,
  );
  const changeValue = usePostInputStore((state) => state.changeValue);
  const titleAlertModal = useModalStore((state) => state.titleAlertModal);
  const { postTitle: title, postDate: date, postContent: content } = data || {};
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (title && date && content) {
      changeValue({ postTitle: title, postDate: date, postContent: content });
    }
  }, []);

  useEffect(() => {
    if (titleAlertModal) {
      titleRef.current?.focus();
      return;
    }
  }, [titleAlertModal]);

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    changeValue({ [name]: e.target.value });
  };

  return (
    <>
      <WritePageDescContainer>
        <DiaryTitleContainer>
          <p>일지 제목</p>
          <p>제목을 작성해 주세요.</p>
          <input
            ref={titleRef}
            type={"text"}
            value={postTitle}
            onChange={(e) => handleValueChange(e, "postTitle")}
          />
        </DiaryTitleContainer>
        <DiaryDateContainer>
          <p>일지 작성 일자</p>
          <p>일지를 기록한 날짜를 선택해 주세요.</p>
          <input
            type={"date"}
            defaultValue={date || postDate}
            max={today}
            onChange={(e) => handleValueChange(e, "postDate")}
          />
        </DiaryDateContainer>
        <WritePageImg postImgs={data?.postImgs} />
        <WritePageDetailContainer>
          <p>내용</p>
          <p>일지에 대한 설명을 적어주세요.</p>
          <textarea
            value={postContent}
            onChange={(e) => handleValueChange(e, "postContent")}
            placeholder={"작성해주세요"}
          />
        </WritePageDetailContainer>
      </WritePageDescContainer>
    </>
  );
};

export default WritePageDesc;
