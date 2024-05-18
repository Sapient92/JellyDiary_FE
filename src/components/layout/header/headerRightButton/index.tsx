import * as React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCategoriesStore } from '../../../../store/categoriesStore/categoriesStore.ts';

import { ButtonContainer, CheckedButton } from './HeaderRightButton.styles.ts';

import SelectButton from '../../../../assets/button/HeaderSelectButton.png';

type HeaderRightButtonProps = {
  title: string;
  name: string;
};

const categryToRoute = {
  bigSns: '',
  smallSns: 'diary',
  myFeed: 'userfeed',
  dm: 'chat',
};

const HeaderRightButton: FC<HeaderRightButtonProps> = ({ title, name, userId }) => {
  const { categories, changeCategory } = useCategoriesStore((state) => state);
  const navigate = useNavigate();

  const handleCategoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let routePath = categryToRoute[name];

    if (name === 'smallSns' && userId) {
      routePath = `${routePath}/${userId}`;
    }
    if (name === 'myFeed' && userId) {
      routePath = `${routePath}/${userId}`;
    }
    if (categories[name]) {
      return;
    }
    changeCategory(name);
    navigate(`/${routePath}`);
  };

  return (
    <ButtonContainer onClick={handleCategoryClick}>
      <button id={'big_sns_btn'}>
        <img src={SelectButton} alt={'SelectButton'} />
        {categories[name] && <CheckedButton />}
      </button>
      <label htmlFor={'big_sns_btn'}>{title}</label>
    </ButtonContainer>
  );
};

export default HeaderRightButton;
