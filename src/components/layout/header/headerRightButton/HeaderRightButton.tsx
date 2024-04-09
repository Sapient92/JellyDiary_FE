import SelectButton from "../../../../assets/button/HeaderSelectButton.png";
import { ButtonContainer, CheckedButton } from "./HeaderRightButton.styles.ts";
import { FC } from "react";
import { useCategoriesStore } from "../../../../store/categoriesStore/categoriesStore.ts";
import * as React from "react";

type HeaderRightButtonProps = {
  title: string;
  name: string;
};

const HeaderRightButton: FC<HeaderRightButtonProps> = ({ title, name }) => {
  const { categories, changeCategory } = useCategoriesStore((state) => state);
  const handleCategoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (categories[name]) {
      return;
    }
    changeCategory(name);
  };

  return (
    <ButtonContainer onClick={handleCategoryClick}>
      <button id={"big_sns_btn"}>
        <img src={SelectButton} alt={"SelectButton"} />
        {categories[name] && <CheckedButton />}
      </button>
      <label htmlFor={"big_sns_btn"}>{title}</label>
    </ButtonContainer>
  );
};

export default HeaderRightButton;
