// UserImageList.styles.js
import styled from 'styled-components';

export const UserImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
