import React, { FC, memo, useEffect, useState } from "react";

import { WriteInputType } from "../../../../types/postType.ts";
import { usePostInputStore } from "../../../../store/postStore/postStore.ts";

import {
  WritePageInput,
  WritePageItemContainer,
  WritePageItemTitleContainer,
  WritePageTitle,
} from "./WritePageItem.styles.ts";

interface WritePageItemProps {
  title: string;
  value: WriteInputType[keyof WriteInputType];
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
  const changeValue = usePostInputStore((state) => state.changeValue);

  useEffect(() => {
    if (defaultValue) {
      setCheckboxChecked(!checkboxChecked);
      changeValue({ [name]: defaultValue });
    }
  }, []);

  const handleChangeChecked = () => {
    setCheckboxChecked(!checkboxChecked);
    changeValue({ [name]: null });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue({ [name]: e.target.value });
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
          <div>
            <p>{title}</p>
          </div>
        </WritePageTitle>
      </WritePageItemTitleContainer>
      <WritePageInput
        type={"text"}
        disabled={!checkboxChecked}
        value={value ? value.toString() : ""}
        onChange={handleTextChange}
      />
    </WritePageItemContainer>
  );
};

const MemoedWritePageItem = memo(WritePageItem);

export default MemoedWritePageItem;
