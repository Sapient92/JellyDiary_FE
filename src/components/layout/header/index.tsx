import React from 'react';
import HeaderRightButton from './headerRightButton';

import {
  AccountButton,
  HeaderContainer,
  LogoContainer,
  RightButtonContainer,
} from './Header.styles.ts';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer to={'/'}>
        <button>로고</button>
      </LogoContainer>
      <RightButtonContainer>
        <HeaderRightButton title={'큰 SNS'} name={'bigSns'} />
        <HeaderRightButton title={'작은 SNS'} name={'smallSns'} />
        <HeaderRightButton title={'내 피드'} name={'myFeed'} />
        <HeaderRightButton title={'DM'} name={'dm'} />
        <AccountButton />
      </RightButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
