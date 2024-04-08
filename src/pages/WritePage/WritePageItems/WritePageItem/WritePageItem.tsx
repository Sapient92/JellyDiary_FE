import {
  WritePageItemContainer,
  WritePageItemTitleContainer,
  WritePageTitle,
} from "./WritePageItem.styles.ts";
import { FC, useState } from "react";

interface WritePageItem {
  title: string;
}

const WritePageItem: FC<WritePageItem> = ({ title }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  return (
    <WritePageItemContainer>
      <WritePageItemTitleContainer>
        <input
          type={"checkbox"}
          checked={checkboxChecked ?? checkboxChecked}
          onChange={() => setCheckboxChecked(!checkboxChecked)}
        />
        <WritePageTitle>
          <p>{title}</p>
        </WritePageTitle>
      </WritePageItemTitleContainer>
      <input type={"text"} disabled={!checkboxChecked} />
    </WritePageItemContainer>
  );
};

export default WritePageItem;
