import React, { useEffect, useState } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BiChat, BiCloud, BiSun } from 'react-icons/bi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import { EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import CustomButton from '../../components/CustomButton';

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
} from './DiaryPage.styles';

import imgSrc from '../../assets/testImage/suggestedPostImage.png';
import api from '../../api';

interface DiaryProps {
  diaryDescription: string;
  diaryName: string;
  diaryProfileImage: string;
}
function renderEventContent(eventInfo: EventContentArg) {
  return (
    <ListContent>
      {eventInfo.event.extendedProps.weather === 'sunny' ? (
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
  const [diaryData, setDiaryData] = useState<DiaryProps>([]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await api.post('http://localhost:8080/api/diary', {
      //     diaryName: '나의 여름 휴가',
      //     diaryDescription: '그리스에서 보낸 여름 휴가에 대한 다이어리.',
      //     diaryProfileImage: '이미지_URL',
      //   });
      const response = await api.get('http://localhost:8080/api/diary/profile/2');
      console.log(response.data);
      setDiaryData(response.data.data);
    };
    fetchData();
  }, []);
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
            <span>{diaryData?.diaryName} </span>
          </div>
          <div>{diaryData?.diaryDescription} </div>
          <CustomButton
            text="Edit Profile"
            backgroundColor="gray"
            disabled={false}
            onClick={() => console.log('Edit Profile')}
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
            left: '',
            center: 'prev,title,next',
            right: 'myCustomButton',
          }}
          customButtons={{
            myCustomButton: {
              text: '+',
              click: () => {
                setEvents([
                  ...events,
                  {
                    title: 'event',
                    date: new Date().toISOString().substr(0, 10),
                    color: '#ffffff',
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
          <img onClick={() => console.log('삭제?')} src={imgSrc} alt="invitedUsers" />
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
