import Header from "./header/Header.tsx";
import {
  HeaderWrapper,
  LayoutContainer,
  OutletWrapper,
} from "./Layout.styles.ts";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </LayoutContainer>
  );
};

export default Layout;
