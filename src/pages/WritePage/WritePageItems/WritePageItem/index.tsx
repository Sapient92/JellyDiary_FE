import { FC, memo, useEffect, useState } from "react";

import { DiaryType } from "../.././../../types/diaryType.ts";
import { useDiaryStore } from "../../../../store/writeStore/diaryStore.ts";

import {
  WritePageInput,
  WritePageItemContainer,
  WritePageItemTitleContainer,
  WritePageTitle,
} from "./WritePageItem.styles.ts";

interface WritePageItemProps {
  title: string;
  value: DiaryType[keyof DiaryType];
  name: string;
  defaultValue: string | null;
}

const WritePageItem: FC<WritePageItemProps> = ({
  title,
  value,
  name,
  defaultValue,
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const changeValue = useDiaryStore((state) => state.changeValue);

  useEffect(() => {
    if (defaultValue) {
      setCheckboxChecked(!checkboxChecked);
      changeValue({ [name]: defaultValue });
    }
  }, []);

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
        value={value ? value.toString() : ""}
        onChange={(e) => changeValue({ [name]: e.target.value })}
      />
    </WritePageItemContainer>
  );
};

const MemoedWritePageItem = memo(WritePageItem);

export default MemoedWritePageItem;
