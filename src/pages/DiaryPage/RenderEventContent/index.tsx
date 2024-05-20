import { MdLockOutline, MdLockOpen } from 'react-icons/md';
import { EventContentArg } from '@fullcalendar/core';
import styled, { css } from 'styled-components';

const ListContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${(props: any) =>
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

  return (
    <ListContent>
      <b>{isPublic === false ? <MdLockOutline /> : <MdLockOpen />}</b>
      <a>{title.length > 5 ? `${title.slice(0, 5)}...` : title}</a>
    </ListContent>
  );
}

export default renderEventContent;
