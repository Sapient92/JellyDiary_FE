import {
  DiaryDateContainer,
  DiaryTitleContainer,
  WritePageDescContainer,
  WritePageDetailContainer,
} from "./WritePageDesc.styles.ts";
import WritePageImg from "./WritePageImg/WritePageImg.tsx";
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import { Diary } from "../../../store/writeStore/diaryStore.type.ts";
import React, { useEffect } from "react";

interface WritePageDescProps {
  data?: Diary;
}

const today = new Date().toISOString().split("T")[0];

const WritePageDesc: React.FC<WritePageDescProps> = ({ data }) => {
  const { postTitle, postDate, postContent } = useDiaryStore(
    (state) => state.diary,
  );
  const changeValue = useDiaryStore((state) => state.changeValue);
  const { postTitle: title, postDate: date, postContent: content } = data || {};

  useEffect(() => {
    if (title && date && content) {
      changeValue({ postTitle: title, postDate: date, postContent: content });
    }
  }, []);
  return (
    <>
      <WritePageDescContainer>
        <DiaryTitleContainer>
          <p>일지 제목</p>
          <p>제목을 작성해 주세요.</p>
          <input
            type={"text"}
            value={postTitle}
            onChange={(e) => changeValue({ postTitle: e.target.value })}
          />
        </DiaryTitleContainer>
        <DiaryDateContainer>
          <p>일지 작성 일자</p>
          <p>일지를 기록한 날짜를 선택해 주세요.</p>
          <input
            type={"date"}
            defaultValue={date || postDate}
            max={today}
            onChange={(e) => changeValue({ postDate: e.target.value })}
          />
        </DiaryDateContainer>
        <WritePageImg />
        <WritePageDetailContainer>
          <p>내용</p>
          <p>일지에 대한 설명을 적어주세요.</p>
          <textarea
            value={postContent}
            onChange={(e) => changeValue({ postContent: e.target.value })}
            placeholder={"작성해주세요"}
          />
        </WritePageDetailContainer>
      </WritePageDescContainer>
    </>
  );
};

export default WritePageDesc;
