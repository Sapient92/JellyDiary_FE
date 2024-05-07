import React from "react";

import MemoedWritePageItem from "./WritePageItem";

import {
  DiaryStoreProps,
  usePostInputStore,
} from "../../../store/postStore/postStore.ts";
import { WriteInputType } from "../../../types/postType.ts";

import { WritePageItemsContainer } from "./WritePageItems.styles.ts";

interface WritePageItemsProps {
  data?: WriteInputType;
}

const WritePageItems: React.FC<WritePageItemsProps> = ({ data }) => {
  const post = usePostInputStore((state: DiaryStoreProps) => state.post);
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
        value={post.meal}
        name={"meal"}
      />
      <MemoedWritePageItem
        title={"간식"}
        defaultValue={snack ? snack : null}
        value={post.snack}
        name={"snack"}
      />
      <MemoedWritePageItem
        title={"물"}
        defaultValue={water ? water : null}
        value={post.water}
        name={"water"}
      />
      <MemoedWritePageItem
        title={`   산책 \n (일광욕)`}
        defaultValue={walk ? walk : null}
        value={post.walk}
        name={"walk"}
      />
      <MemoedWritePageItem
        title={"배변"}
        defaultValue={toiletRecord ? toiletRecord : null}
        value={post.toiletRecord}
        name={"toiletRecord"}
      />
      <MemoedWritePageItem
        title={"목욕"}
        defaultValue={shower ? shower : null}
        value={post.shower}
        name={"shower"}
      />
      <MemoedWritePageItem
        title={"체중"}
        defaultValue={weight ? weight : null}
        value={post.weight}
        name={"weight"}
      />
      <MemoedWritePageItem
        title={`     행동 \n/ 특이사항`}
        defaultValue={specialNote ? specialNote : null}
        value={post.specialNote}
        name={"specialNote"}
      />
    </WritePageItemsContainer>
  );
};

export default WritePageItems;
