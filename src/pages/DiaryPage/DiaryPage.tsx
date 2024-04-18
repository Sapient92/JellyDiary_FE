import React, { useState } from "react";
import {
  DiaryPageContainer,
  DiaryPageContent,
  DiaryLeftContent,
  UserImage,
  UserInfo,
  DiaryLeftNav,
  UserList,
  AddUser,
  ListContent,
  DiaryRightNav,
} from "./DiaryPage.styles";
import { MdEdit } from "react-icons/md";
import imgSrc from "../../assets/testImage/suggestedPostImage.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import CustomButton from "../../components/Button/CustomButton/CustomButton";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import {
  CustomButtonInput,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core/index.js";
import allLocales from "@fullcalendar/core/locales-all";
import { BiChat, BiCloud, BiSun } from "react-icons/bi";

// 오류 'JSX.IntrinsicElements' 형식에 'div' 속성이 없습니다.ts(2339)
// https://github.com/vitejs/vite/issues/14011

// 캘린더 어떻게 만들지

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <ListContent>
      {eventInfo.event.extendedProps.weather === "sunny" ? (
        <b>
          <BiSun />
        </b>
      ) : (
        <b>
          <BiCloud />
        </b>
      )}
      <a>{eventInfo.event.title}</a>
      <a>{eventInfo.event.extendedProps.writer}</a>
    </ListContent>
  );
}

const DiaryPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };
  const customButton = {
    saveButton: {
      text: "Today",
      icon: "plus",
      click: () => console.log("Today"),
    },
    cancelButton: {
      click: () => console.log("Cancelling..."),
      text: "Cancel",
      color: "red",
    },
  };
  return (
    <DiaryPageContainer>
      <DiaryLeftContent>
        <UserImage>
          <img src={imgSrc} alt="userImage" />
          <div>
            <MdEdit />
          </div>
        </UserImage>
        <UserInfo>
          <div>
            <span>Hello, </span>
            <span>다이어리이름 </span>
          </div>
          <div>다이어리 소개글</div>
          <CustomButton
            text="Edit Profile"
            backgroundColor="gray"
            disabled={false}
            onClick={() => console.log("Edit Profile")}
          />
        </UserInfo>
        <DiaryLeftNav>
          <div>
            <span>다이어리 리스트</span>
            <span onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <UserList>
            <div>
              <img src={imgSrc} alt="userImage" />
              <div>유저 이름</div>
            </div>
            <div>
              <img src={imgSrc} alt="userImage" />
              <div>유저 이름</div>
            </div>
            <div>
              <img src={imgSrc} alt="userImage" />
              <div>유저 이름</div>
            </div>
            <div>
              <img src={imgSrc} alt="userImage" />
              <div>유저 이름</div>
            </div>
          </UserList>
          <AddUser>
            <div>
              <AiFillPlusCircle />
              <span> 다이어리 생성</span>
            </div>
          </AddUser>
        </DiaryLeftNav>
      </DiaryLeftContent>
      <DiaryPageContent>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "",
            center: "prev,title,next",
            right: "myCustomButton",
          }}
          customButtons={{
            myCustomButton: {
              text: "+",
              click: () => {
                setEvents([
                  ...events,
                  {
                    title: "event",
                    date: new Date().toISOString().substr(0, 10),
                    color: "#ffffff",
                  },
                ]);
              },
            },
          }}
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          locales={allLocales}
          locale="kr"
          dayCellContent={(info) => {
            return info.date.getDate();
          }}
        />
      </DiaryPageContent>
      <DiaryRightNav>
        <BiChat />
        <div>
          <img
            onClick={() => console.log("삭제?")}
            src={imgSrc}
            alt="invitedUsers"
          />
          <img src={imgSrc} alt="invitedUsers" />
          <img src={imgSrc} alt="invitedUsers" />
          <img src={imgSrc} alt="invitedUsers" />
          <img src={imgSrc} alt="invitedUsers" />
          <img src={imgSrc} alt="invitedUsers" />
          <img src={imgSrc} alt="invitedUsers" />
        </div>
      </DiaryRightNav>
    </DiaryPageContainer>
  );
};

export default DiaryPage;
