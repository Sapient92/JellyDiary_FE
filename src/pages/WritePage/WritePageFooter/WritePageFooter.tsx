import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";
import Button from "../../../components/Button/Button.tsx";
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import axios from "axios";

const WritePageFooter = () => {
  const { diary, changeValue } = useDiaryStore((state) => state);
  axios.get("/posts").then((res) => console.log(res));
  const handlePostClick = () => {
    axios.post("/post", { ...diary }).then((r) => r);
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
