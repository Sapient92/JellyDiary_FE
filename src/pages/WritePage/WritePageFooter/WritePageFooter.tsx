import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";
import Button from "../../../components/Button/Button.tsx";

const WritePageFooter = () => {
  return (
    <WritePageFooterContainer>
      <FooterBtnContainer>
        <PrivateBtnContainer>
          <input id={"private_checkbox"} type={"checkbox"} />
          <label htmlFor={"private_checkbox"}>체크하여 비공개로 게시하기</label>
        </PrivateBtnContainer>
        <Button className={"post"}>게시</Button>
      </FooterBtnContainer>
    </WritePageFooterContainer>
  );
};

export default WritePageFooter;
