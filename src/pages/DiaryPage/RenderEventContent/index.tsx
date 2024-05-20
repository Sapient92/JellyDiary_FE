import React from 'react';
import { MdLockOutline, MdLockOpen } from 'react-icons/md';
import { EventContentArg } from '@fullcalendar/core';
import styled, { css } from 'styled-components';

const ListContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${(props) =>
    props.isPublic
      ? css`
          color: #6b7a99; /* 공개 이벤트의 색상 */
        `
      : css`
          color: #6b7a99; /* 비공개 이벤트의 색상 */
        `}
`;

function renderEventContent(eventInfo: EventContentArg) {
  const { title, extendedProps } = eventInfo.event;
  const isPublic = extendedProps.isPublic;

  // 제목이 다섯 글자를 초과하는 경우 ...으로 표시
  const displayTitle = title.length > 5 ? `${title.substring(0, 5)}...` : title;

  return (
    <ListContent isPublic={isPublic}>
      {isPublic ? (
        <b>
          <MdLockOpen />
        </b>
      ) : (
        <b>
          <MdLockOutline />
        </b>
      )}
      <a>{displayTitle}</a>
    </ListContent>
  );
}

export default renderEventContent;
