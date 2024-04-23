import { WritePageItemsContainer } from "./WritePageItems.styles.ts";
import MemoedWritePageItem from "./WritePageItem";
import {
  DiaryStoreProps,
  useDiaryStore,
} from "../../../store/writeStore/diaryStore.ts";
import { DiaryType } from "../../../types/diaryType.ts";
import React from "react";

interface WritePageItemsProps {
  data?: DiaryType;
}

const WritePageItems: React.FC<WritePageItemsProps> = ({ data }) => {
  const diary = useDiaryStore((state: DiaryStoreProps) => state.diary);
  const {
    meal,
    snack,
    water,
    walk,
    toiletRecord,
    shower,
    weight,
    specialNote,
  } = data || {};

  return (
    <WritePageItemsContainer>
      <MemoedWritePageItem
        title={"식사"}
        defaultValue={meal ? meal : null}
        value={diary.meal}
        name={"meal"}
      />
      <MemoedWritePageItem
        title={"간식"}
        defaultValue={snack ? snack : null}
        value={diary.snack}
        name={"snack"}
      />
      <MemoedWritePageItem
        title={"물"}
        defaultValue={water ? water : null}
        value={diary.water}
        name={"water"}
      />
      <MemoedWritePageItem
        title={`   산책 \n (일광욕)`}
        defaultValue={walk ? walk : null}
        value={diary.walk}
        name={"walk"}
      />
      <MemoedWritePageItem
        title={"배변"}
        defaultValue={toiletRecord ? toiletRecord : null}
        value={diary.toiletRecord}
        name={"toiletRecord"}
      />
      <MemoedWritePageItem
        title={"목욕"}
        defaultValue={shower ? shower : null}
        value={diary.shower}
        name={"shower"}
      />
      <MemoedWritePageItem
        title={"체중"}
        defaultValue={weight ? weight : null}
        value={diary.weight}
        name={"weight"}
      />
      <MemoedWritePageItem
        title={`     행동 \n/ 특이사항`}
        defaultValue={specialNote ? specialNote : null}
        value={diary.specialNote}
        name={"specialNote"}
      />
    </WritePageItemsContainer>
  );
};

export default WritePageItems;
