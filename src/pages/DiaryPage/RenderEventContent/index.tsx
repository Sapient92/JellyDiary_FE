import { MdLockOutline, MdLockOpen } from 'react-icons/md';
import { EventContentArg } from '@fullcalendar/core';
import styled, { css } from 'styled-components';
interface props {
  isPublic: boolean;
}
const ListContent = styled.div<props>`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;

  ${(props: any) =>
    props.isPublic
      ? css`
          b {
            background-color: #3ea9e5;
          }
        `
      : css`
          b {
            background-color: #ff6633;
          }
        `}
`;

function renderEventContent(eventInfo: EventContentArg) {
  const { title, extendedProps } = eventInfo.event;
  const isPublic = extendedProps.isPublic;
  return (
    <ListContent isPublic={isPublic}>
      <b>{isPublic === false ? <MdLockOutline /> : <MdLockOpen />}</b>
      <a>{title.length > 5 ? `${title.slice(0, 5)}...` : title}</a>
    </ListContent>
  );
}
export default renderEventContent;
