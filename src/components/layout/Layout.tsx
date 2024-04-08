import Header from "./header/Header.tsx";
import {
  HeaderWrapper,
  LayoutContainer,
  OutletContent,
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
        <OutletContent>
          <Outlet />
        </OutletContent>
      </OutletWrapper>
    </LayoutContainer>
  );
};

export default Layout;
