import {
  DiaryDateContainer,
  DiaryTitleContainer,
  WritePageDescContainer,
  WritePageDetailContainer,
} from "./WritePageDesc.styles.ts";
import WritePageImg from "./WritePageImg/WritePageImg.tsx";
import { useDiaryStore } from "../../../store/writeStore/writeStore.ts";

const WritePageDesc = () => {
  const { title, createdAt } = useDiaryStore((state) => state.diary);
  const changeValue = useDiaryStore((state) => state.changeValue);
  return (
    <>
      <WritePageDescContainer>
        <DiaryTitleContainer>
          <p>일지 제목</p>
          <p>제목을 작성해 주세요.</p>
          <input
            type={"text"}
            value={title}
            onChange={(e) => changeValue({ title: e.target.value })}
          />
        </DiaryTitleContainer>
        <DiaryDateContainer>
          <p>일지 작성 일자</p>
          <p>일지를 기록한 날짜를 선택해 주세요.</p>
          <input
            type={"date"}
            defaultValue={createdAt}
            max={createdAt}
            onChange={(e) => changeValue({ createdAt: e.target.value })}
          />
        </DiaryDateContainer>
        <WritePageImg />
        <WritePageDetailContainer>
          <p>내용</p>
          <p>일지에 대한 설명을 적어주세요.</p>
          <textarea placeholder={"작성해주세요"} />
        </WritePageDetailContainer>
      </WritePageDescContainer>
    </>
  );
};

export default WritePageDesc;
