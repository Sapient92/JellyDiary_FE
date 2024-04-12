import {
  WritePageInput,
  WritePageItemContainer,
  WritePageItemTitleContainer,
  WritePageTitle,
} from "./WritePageItem.styles.ts";
import { FC, memo, useState } from "react";
import { Diary } from "../../../../store/writeStore/writeStore.type.ts";
import { useDiaryStore } from "../../../../store/writeStore/writeStore.ts";

interface WritePageItem {
  title: string;
  value: Diary[keyof Diary];
  name: string;
}

const WritePageItem: FC<WritePageItem> = ({ title, value, name }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const changeValue = useDiaryStore((state) => state.changeValue);

  const handleChangeChecked = () => {
    setCheckboxChecked(!checkboxChecked);
    changeValue({ [name]: "" });
  };

  return (
    <WritePageItemContainer>
      <WritePageItemTitleContainer>
        <input
          type={"checkbox"}
          checked={checkboxChecked ?? checkboxChecked}
          onChange={handleChangeChecked}
        />
        <WritePageTitle>
          <p>{title}</p>
        </WritePageTitle>
      </WritePageItemTitleContainer>
      <WritePageInput
        type={"text"}
        disabled={!checkboxChecked}
        value={value}
        onChange={(e) => changeValue({ [name]: e.target.value })}
      />
    </WritePageItemContainer>
  );
};

const MemoedWritePageItem = memo(WritePageItem);

export default MemoedWritePageItem;
