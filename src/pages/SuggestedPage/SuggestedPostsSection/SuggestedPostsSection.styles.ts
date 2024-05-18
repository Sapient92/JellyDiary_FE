// SuggestedPostsSection.styles.ts
import styled from 'styled-components';

export const PostsSection = styled.section`
  display: grid;
  gap: 16px; // gap between grid items
  padding: 16px;

  /* Adjust the number of columns based on screen size */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); // 4 columns on large screens
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr); // 3 columns on medium-large screens
  }

  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr); // 2 columns on medium screens
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr; // 1 column on small screens
  }
`;

export const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
`;
