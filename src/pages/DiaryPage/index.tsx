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
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

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
  const [diaryAuth, setDiaryAuth] = useState('');
  const [diaryList, setDiaryList] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(imgSrc);

  const { user } = useUser();
  const navigate = useNavigate();

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/diary/mydiaryList');
      setDiaryList(response.data.data);
      setDiaryData(diaryList[0]);
    };
    fetchData();
  }, []);
  const updateProfileImage = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('newProfileImg', file);

    try {
      const response = await api.patch('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('다이어리 프로필 수정 완료:', response.data.message);
      } else {
        console.error('프로필 이미지 업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류 발생:', error);
    }
  };
  const handleDiaryClick = async (id) => {
    const response = await api.get(`/api/diary/profile/${id}`);
    const auth = await api.get(`/api/diary/user/${id}`);

    setDiaryData(response.data.data);
    setDiaryAuth(auth.data.data.diaryRole);
  };
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    updateProfileImage(file);
  };
  const hanldeWrite = (diaryId) => {
    navigate(`/write/${diaryId}`);
  };
  return (
    <DiaryPageContainer>
      <DiaryLeftContent>
        <UserImage>
          <img src={uploadedImage} alt="userImage" />
          <div>
            <label htmlFor="file">
              <MdEdit />
            </label>
            <input
              type={'file'}
              name="file"
              id="file"
              accept={'image/*'}
              multiple={false}
              onChange={onChangeImage}
              style={{ display: 'none' }}
            />
          </div>
        </UserImage>
        <UserInfo>
          <div>
            <span>Hello, </span>
            <span>{diaryData?.diaryName} </span>
          </div>
          <div>{diaryData?.diaryDescription} </div>
          {diaryAuth == 'CREATOR' ? (
            <CustomButton
              text="Edit Profile"
              backgroundColor="blue"
              disabled={false}
              onClick={() => console.log('Edit Profile')}
            />
          ) : (
            <div></div>
          )}
        </UserInfo>
        <DiaryLeftNav>
          <div>
            <span>다이어리 리스트</span>
            <span onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <UserList>
            {diaryList.map((diary) => (
              <div key={diary.diaryId} onClick={() => handleDiaryClick(diary.diaryId)}>
                <img src={diary.diaryProfileImage} alt="userImage" />
                <div>{diary.diaryName}</div>
              </div>
            ))}
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
                hanldeWrite(diaryData.diaryId);
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
