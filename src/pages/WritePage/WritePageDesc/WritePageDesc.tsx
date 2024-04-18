import {
  DiaryDateContainer,
  DiaryTitleContainer,
  WritePageDescContainer,
  WritePageDetailContainer,
} from "./WritePageDesc.styles.ts";
import WritePageImg from "./WritePageImg/WritePageImg.tsx";
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";

const WritePageDesc = () => {
  const { postTitle, postDate, postContent } = useDiaryStore(
    (state) => state.diary,
  );
  const changeValue = useDiaryStore((state) => state.changeValue);

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
            defaultValue={postDate}
            max={postDate}
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
