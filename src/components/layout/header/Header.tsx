import {
  AccountButton,
  HeaderContainer,
  LogoContainer,
  RightButtonContainer,
} from "./Header.styles.ts";
import HeaderRightButton from "./headerRightButton/HeaderRightButton.tsx";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <button>로고</button>
      </LogoContainer>
      <RightButtonContainer>
        <HeaderRightButton name={"큰 SNS"} />
        <HeaderRightButton name={"작은 SNS"} />
        <HeaderRightButton name={"내 피드"} />
        <HeaderRightButton name={"DM"} />
        <AccountButton />
      </RightButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
