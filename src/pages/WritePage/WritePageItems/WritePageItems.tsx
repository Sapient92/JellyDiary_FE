import { WritePageItemsContainer } from "./WritePageItems.styles.ts";
import MemoedWritePageItem from "./WritePageItem/WritePageItem.tsx";
import {
  DiaryStoreProps,
  useDiaryStore,
} from "../../../store/writeStore/writeStore.ts";

const WritePageItems = () => {
  const diary = useDiaryStore((state: DiaryStoreProps) => state.diary);
  return (
    <WritePageItemsContainer>
      <MemoedWritePageItem title={"식사"} value={diary.meal} name={"meal"} />
      <MemoedWritePageItem title={"간식"} value={diary.snack} name={"snack"} />
      <MemoedWritePageItem title={"물"} value={diary.water} name={"water"} />
      <MemoedWritePageItem
        title={`   산책 \n (일광욕)`}
        value={diary.walk}
        name={"walk"}
      />
      <MemoedWritePageItem
        title={"배변"}
        value={diary.defecation}
        name={"defecation"}
      />
      <MemoedWritePageItem title={"목욕"} value={diary.bath} name={"bath"} />
      <MemoedWritePageItem
        title={"체중"}
        value={diary.weight}
        name={"weight"}
      />
      <MemoedWritePageItem
        title={`     행동 \n/ 특이사항`}
        value={diary.significant}
        name={"significant"}
      />
    </WritePageItemsContainer>
  );
};

export default WritePageItems;
