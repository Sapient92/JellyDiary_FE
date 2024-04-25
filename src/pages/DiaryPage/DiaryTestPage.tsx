import React from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 추가
import { INITIAL_EVENTS, createEventId } from './event-utils'; // 추가
import './DiaryTestPage.css';
import { BiCloud, BiSun } from 'react-icons/bi';
interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
    return (
      <div className="demo-app">
        {this.renderSidebar()}
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev next',
              center: 'title',
              right: '',
            }}
            initialView="dayGridMonth"
            editable={false}
            locale="kr"
            dayCellContent={(info) => {
              return info.date.getDate();
            }}
            selectable={true}
            selectMirror={false}
            dayMaxEvents={true}
            dayMaxEventRows={true}
            weekends={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>사용 방법</h2>
          <ul>
            <li>날짜를 선택하고 새로운 일지 제목을 입력해 생성가능해요</li>
            <li>드래그앤 드롭으로 일지 날짜를 변경할 수 있어요</li>
            <li>일지를 클릭하면 삭제할 수 있어요</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section"></div>
        <div className="demo-app-sidebar-section">
          <h2>일지 작성 목록 ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('✏️ 일정 제목을 작성해주세요.');
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo.view.calendar);
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        writer: 'User1',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: '#ffffff',
      });
    }
  };

  handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`🗑️ 정말 일지를 삭제할까요? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      {eventContent.event.extendedProps.weather === 'sunny' ? (
        <b>
          <BiSun />
        </b>
      ) : (
        <b>
          <BiCloud />
        </b>
      )}
      <a>{eventContent.event.title}</a>
      ㅤㅤㅤ
      <div>{eventContent.event.extendedProps.writer}</div>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </b>
      <a>{event.title}</a>
    </li>
  );
}
