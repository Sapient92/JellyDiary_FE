import * as React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCategoriesStore } from '../../../../store/categoriesStore/categoriesStore';

import { ButtonContainer, CheckedButton } from './HeaderRightButton.styles';

import SelectButton from '../../../../assets/button/HeaderSelectButton.png';

type HeaderRightButtonProps = {
  title: string;
  name: keyof typeof categryToRoute;
  userId?: string;
};

const categryToRoute = {
  bigSns: 'sns',
  smallSns: 'diary',
  myFeed: 'userfeed',
  dm: 'chat',
} as const;

const HeaderRightButton: FC<HeaderRightButtonProps> = ({ title, name, userId }) => {
  const { categories, changeCategory } = useCategoriesStore((state) => state);
  const navigate = useNavigate();

  const handleCategoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let routePath: any = categryToRoute[name];

    if ((name === 'smallSns' || name === 'myFeed') && userId) {
      routePath = `${routePath}/${userId}`;
    }

    if (!categories[name]) {
      changeCategory(name);
      navigate(`/${routePath}`);
    }
  };

  return (
    <ButtonContainer onClick={handleCategoryClick}>
      <button id="big_sns_btn">
        <img src={SelectButton} alt="SelectButton" />
        {categories[name] && <CheckedButton />}
      </button>
      <label htmlFor="big_sns_btn">{title}</label>
    </ButtonContainer>
  );
};

export default HeaderRightButton;
