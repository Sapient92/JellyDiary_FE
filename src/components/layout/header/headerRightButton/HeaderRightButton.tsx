import SelectButton from "../../../../assets/button/HeaderSelectButton.png";
import { ButtonContainer } from "./HeaderRightButton.styles.ts";
import { FC } from "react";

type HeaderRightButtonProps = {
  name: string;
};

const HeaderRightButton: FC<HeaderRightButtonProps> = ({ name }) => {
  return (
    <ButtonContainer>
      <button id={"big_sns_btn"}>
        <img src={SelectButton} alt={"SelectButton"} />
      </button>
      <label htmlFor={"big_sns_btn"}>{name}</label>
    </ButtonContainer>
  );
};

export default HeaderRightButton;
