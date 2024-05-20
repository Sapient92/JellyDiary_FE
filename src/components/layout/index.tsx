import { Outlet } from 'react-router-dom';

import Header from './header';

import { HeaderWrapper, LayoutContainer, OutletContent, OutletWrapper } from './Layout.styles.ts';

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
