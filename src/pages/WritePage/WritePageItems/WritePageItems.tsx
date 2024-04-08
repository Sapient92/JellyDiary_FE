import { WritePageItemsContainer } from "./WritePageItems.styles.ts";
import WritePageItem from "./WritePageItem/WritePageItem.tsx";

const WritePageItems = () => {
  return (
    <WritePageItemsContainer>
      <WritePageItem title={"식사"} />
      <WritePageItem title={"간식"} />
      <WritePageItem title={"물"} />
      <WritePageItem title={`   산책 \n (일광욕)`} />
      <WritePageItem title={"배변"} />
      <WritePageItem title={"목욕"} />
      <WritePageItem title={"체중"} />
      <WritePageItem title={`     행동 \n/ 특이사항`} />
    </WritePageItemsContainer>
  );
};

export default WritePageItems;
