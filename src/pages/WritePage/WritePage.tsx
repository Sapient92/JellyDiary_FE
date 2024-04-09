import { WritePageContainer, WritePageContent } from "./WritePage.styles.ts";
import WritePageHeader from "./WritePageHeader/WritePageHeader.tsx";
import WritePageItems from "./WritePageItems/WritePageItems.tsx";
import WritePageDesc from "./WritePageDesc/WritePageDesc.tsx";
import WritePageFooter from "./WritePageFooter/WritePageFooter.tsx";

const WritePage = () => {
  return (
    <WritePageContainer>
      <WritePageContent>
        <WritePageHeader title={"일지 작성하기"} />
        <WritePageItems />
        <WritePageDesc />
        <WritePageFooter />
      </WritePageContent>
    </WritePageContainer>
  );
};

export default WritePage;
