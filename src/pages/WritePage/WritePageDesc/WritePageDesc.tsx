import {
  DiaryDateContainer,
  DiaryTitleContainer,
  WritePageDescContainer,
} from "./WritePageDesc.styles.ts";
import WritePageImg from "./WritePageImg/WritePageImg.tsx";

const WritePageDesc = () => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <WritePageDescContainer>
      <DiaryTitleContainer>
        <p>일지 제목</p>
        <p>제목을 작성해 주세요.</p>
        <input type={"text"} />
      </DiaryTitleContainer>
      <DiaryDateContainer>
        <p>일지 작성 일자</p>
        <p>일지를 기록한 날짜를 선택해 주세요.</p>
        <input type={"date"} defaultValue={today} max={today} />
      </DiaryDateContainer>
      <WritePageImg />
    </WritePageDescContainer>
  );
};

export default WritePageDesc;
