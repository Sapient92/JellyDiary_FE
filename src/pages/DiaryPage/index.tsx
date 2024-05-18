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
import { useNavigate, useParams } from 'react-router-dom';
import CreateDiaryModal from './DiaryWritePage';
import UserImageList from './UserImageList';

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
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [diaryData, setDiaryData] = useState<DiaryProps>([]);
  const [diaryAuth, setDiaryAuth] = useState('');
  const [diaryList, setDiaryList] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(imgSrc);
  const [chatList, setChatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEventClick = (clickInfo: EventClickArg) => {
    const postId = clickInfo.event._def.extendedProps.postId;
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/diary/mydiaryList');
      const data = await api.get(`/api/diary/profile/${id}`);
      setDiaryList(response.data.data);
      setDiaryData(data.data.data);
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
  const updateEvents = async (id: number) => {
    const response = await api.get(`/api/post/postList/${id}`);
    return response;
  };
  const transformEventData = (apiData) => {
    return apiData.map((event) => ({
      title: event.postTitle,
      date: event.postDate,
      extendedProps: {
        postId: event.postId,
        weather: event.weather,
        writer: event.userId,
        diaryId: event.diaryId,
      },
    }));
  };

  const fetchGroupChat = async (diaryId) => {
    const response = await api.get(`/api/diary/user/list/${diaryId}`);
    return response.data.data;
  };

  const filterNonSubscribers = (data) => {
    if (!data) return [];
    return data.filter((item) => item.diaryRole !== 'SUBSCRIBE').map((item) => item.userId);
  };

  const handleDiaryClick = async (id) => {
    const response = await api.get(`/api/diary/profile/${id}`);
    const auth = await api.get(`/api/diary/user/${id}`);
    const events = await updateEvents(id);
    const test = await fetchGroupChat(id);
    setChatList(filterNonSubscribers(test));
    setDiaryData(response.data.data);
    setDiaryAuth(auth.data.data.diaryRole);
    setEvents(transformEventData(events.data.data));
    navigate(`/diary/${id}`);
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

  const handleCreateDiary = async (diaryData) => {
    try {
      const formData = new FormData();
      formData.append('diaryName', diaryData.diaryName);
      formData.append('diaryDescription', diaryData.diaryDescription);
      if (diaryData.diaryProfileImage !== 'path_to_default_image') {
        formData.append('diaryProfileImage', diaryData.diaryProfileImage);
      }

      const response = await api.post('/api/diary', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setDiaryList([...diaryList, response.data.data]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to create diary:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  const handleClickGroupChat = (diaryId, diaryName) => {
    navigate(`/chat/group/${diaryId}?roomName=${diaryName}`);
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
            {diaryList.length <= 0 ? (
              <div>다이어리를 생성하세요✨</div>
            ) : (
              diaryList.map((diary) => (
                <div key={diary.diaryId} onClick={() => handleDiaryClick(diary.diaryId)}>
                  <img src={diary.diaryProfileImage} alt="userImage" />
                  <div>{diary.diaryName}</div>
                </div>
              ))
            )}
          </UserList>
          <AddUser onClick={() => setIsModalOpen(true)}>
            <div>
              <AiFillPlusCircle />
              <span> 다이어리 생성</span>
            </div>
          </AddUser>
        </DiaryLeftNav>
      </DiaryLeftContent>
      <DiaryPageContent>
        {diaryAuth == 'CREATOR' ? (
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
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: '',
              center: 'prev,title,next',
              right: '',
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
        )}
      </DiaryPageContent>
      <DiaryRightNav>
        <BiChat onClick={() => handleClickGroupChat(diaryData?.diaryId, diaryData?.diaryName)} />
        <UserImageList userIds={chatList} />
      </DiaryRightNav>

      <CreateDiaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDiary}
      />
    </DiaryPageContainer>
  );
};

export default DiaryPage;
