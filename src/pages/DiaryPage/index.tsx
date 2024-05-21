import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit, MdGroup } from 'react-icons/md';
import { EventClickArg } from '@fullcalendar/core';
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
  DiaryRightNav,
  GroupIcon,
  UserImageContainer,
} from './DiaryPage.styles';
import imgSrc from '../../assets/testImage/suggestedPostImage.png';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import CreateDiaryModal from './DiaryWritePage/index';
import UserImageList from './UserImageList';
import renderEventContent from './RenderEventContent';
import useUser from '../../hooks/useUser';

const DiaryPage = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [diaryData, setDiaryData] = useState<any>();
  const [diaryAuth, setDiaryAuth] = useState('');
  const [authData, setAuthData] = useState<any>([]);
  const [diaryList, setDiaryList] = useState<any>([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleEventClick = (clickInfo: EventClickArg) => {
    const postId = clickInfo.event._def.extendedProps.postId;
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/diary/mydiaryList');
      if (!id) {
        navigate(`/diary/${response.data.data[0].diaryId}`);
      }
      const data = await api.get(`/api/diary/profile/${id}`);
      const auth = await api.get(`/api/diary/user/${id}`).catch(() => {
        setIsNotFound(true);
      });
      const events = await updateEvents(id);
      const test = await fetchGroupChat(id);
      setChatList(filterNonSubscribers(test));
      setDiaryData(response.data.data);
      setDiaryAuth(auth?.data.data.diaryRole);
      setAuthData(auth?.data.data);
      setEvents(transformEventData(events));
      setDiaryList(response.data.data);
      setDiaryData(data.data.data);
      setUploadedImage(data.data.data.diaryProfileImage);
    };
    fetchData();
  }, [id]);

  const updateProfileImage = async (diaryId: any, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('diaryProfileImage', file);

    try {
      const response = await api.patch(`/api/diary/profile/img/${diaryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('다이어리 프로필 수정 완료:', response.data.message);
        window.location.reload();
      } else {
        console.error('프로필 이미지 업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류 발생:', error);
    }
  };

  const updateEvents = async (id: any) => {
    const response = await api.get(`/api/post/postList/${id}`);
    const publicEvents = await response.data.data.filter((event: any) => event.isPublic);

    if (diaryAuth === 'CREATOR' || diaryAuth === 'READ' || diaryAuth === 'WRITE') {
      return response.data.data;
    } else {
      return publicEvents;
    }
  };

  const transformEventData = (apiData: any) => {
    return apiData.map((event: any) => ({
      title: event.postTitle,
      date: event.postDate,
      borderColor: event.isPublic ? '#3EA9E5' : '#FF6633',
      backgroundColor: event.isPublic ? '#F5F5F5' : '#FFF7F5',
      extendedProps: {
        postId: event.postId,
        weather: event.weather,
        writer: event.userId,
        diaryId: event.diaryId,
        isPublic: event.isPublic,
        borderColor: event.isPublic ? '#3EA9E5' : '#FF6633',
      },
    }));
  };

  const fetchGroupChat = async (diaryId: any) => {
    const response = await api.get(`/api/diary/user/list/${diaryId}`);
    return response.data.data;
  };

  const filterNonSubscribers = (data: any) => {
    if (!data) return [];
    return data
      .filter((item: any) => item.diaryRole !== 'SUBSCRIBE')
      .map((item: any) => item.userId);
  };

  const handleDiaryClick = async (id: any) => {
    const response = await api.get(`/api/diary/profile/${id}`);
    const auth = await api.get(`/api/diary/user/${id}`);
    const events = await updateEvents(id);
    const test = await fetchGroupChat(id);
    setChatList(filterNonSubscribers(test));
    setDiaryData(response.data.data);
    setDiaryAuth(auth.data.data.diaryRole);
    setAuthData(auth.data.data);
    setEvents(transformEventData(events));
    navigate(`/diary/${id}`);
  };

  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    updateProfileImage(id, file);
  };

  const hanldeWrite = (diaryId: any) => {
    navigate(`/write/${diaryId}`);
  };

  const handleCreateDiary = async (diaryData: any) => {
    const formData = new FormData();
    const diaryJson = JSON.stringify({
      diaryName: diaryData.diaryName,
      diaryDescription: diaryData.diaryDescription,
    });
    const blob = new Blob([diaryJson], { type: 'application/json' });
    formData.append('diaryProfileRequestDto', blob);

    if (diaryData.diaryProfileImage) {
      formData.append('diaryProfileImage', diaryData.diaryProfileImage);
    }

    try {
      const response = await api.post('/api/diary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setDiaryList([...diaryList, response.data.data]);
        setIsModalOpen(false);
        navigate(`/diary/${response.data.data.diaryId}`);
      } else {
        console.error('Failed to create diary:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  const handleClickGroupChat = (diaryId: any, diaryName: any) => {
    navigate(`/chat/group/${diaryId}?roomName=${diaryName}`);
  };

  const handleInviteUser = async () => {
    const response = await api.patch(`/api/diary/user/${authData?.diaryUserId}`);
    if (response.status === 200) {
      window.location.reload();
    }
  };
  if (isNotFound) {
    const fetchData = async () => {
      const response = await api.get('/api/diary/mydiaryList');
      if (!id) {
        navigate(`/diary/${response.data.data[0].diaryId}`);
        window.location.reload();
      }
      const data = await api.get(`/api/diary/profile/${id}`);

      setDiaryData(response.data.data);
      setDiaryList(response.data.data);
      setDiaryData(data.data.data);
      setUploadedImage(data.data.data.diaryProfileImage);
    };
    fetchData();
  }

  const renderContentByAuth = () => {
    switch (diaryAuth) {
      case 'CREATOR':
        return (
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
                  hanldeWrite(diaryData?.diaryId);
                },
              },
            }}
            eventBackgroundColor={isModalOpen ? 'red' : 'blue'}
            events={events}
            dayMaxEventRows={3}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            locales={allLocales}
            locale="kr"
            dayCellContent={(info) => {
              return info.date.getDate();
            }}
          />
        );
      case 'WRITE':
        return (
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
                  hanldeWrite(diaryData?.diaryId);
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
        );
      case 'READ':
        return (
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
        );
      case 'SUBSCRIBE':
        return (
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
        );
      default:
        return (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: '',
              center: 'prev,title,next',
              right: '',
            }}
            events={events}
            dayMaxEvents={true}
            dayMaxEventRows={true}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            locales={allLocales}
            locale="kr"
            dayCellContent={(info) => {
              return info.date.getDate();
            }}
          />
        );
    }
  };
  const handleEditProfile = () => {
    navigate(`/diary/edit/${id}`);
  };

  const handleSubscribe = async () => {
    const response = await api.post(`/api/diary/user`, {
      diaryId: id,
      userId: user?.userId,
    });
    console.log(response.data.data);
    window.location.reload();
  };
  return (
    <DiaryPageContainer>
      <DiaryLeftContent>
        <UserImage>
          <img src={uploadedImage || imgSrc} alt="userImage" />
          <div>
            <label htmlFor="file">
              <MdEdit />
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
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
          {diaryAuth === 'CREATOR' ? (
            <CustomButton
              text="다이어리 수정"
              backgroundColor="blue"
              disabled={false}
              onClick={handleEditProfile}
            />
          ) : (
            <div></div>
          )}
          {authData?.isInvited === false ? (
            <CustomButton
              text="초대 승인"
              backgroundColor="green"
              disabled={false}
              onClick={handleInviteUser}
            />
          ) : (
            <div>{authData?.diaryRole}</div>
          )}
          {diaryAuth === 'SUBSCRIBE' ||
          diaryAuth === 'CREATOR' ||
          diaryAuth === 'READ' ||
          diaryAuth === 'WRITE' ? null : (
            <CustomButton
              text="구독 하기"
              backgroundColor="blue"
              disabled={false}
              onClick={handleSubscribe}
            />
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
              diaryList.map((diary: any) => (
                <div key={diary.diaryId} onClick={() => handleDiaryClick(diary.diaryId)}>
                  <img src={diary.diaryProfileImage || imgSrc} alt="userImage" />
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
      <DiaryPageContent>{renderContentByAuth()}</DiaryPageContent>
      {diaryAuth === 'CREATOR' || diaryAuth === 'READ' || diaryAuth === 'WRITE' ? (
        <DiaryRightNav>
          <div>
            <GroupIcon
              onClick={() => handleClickGroupChat(diaryData?.diaryId, diaryData?.diaryName)}
            >
              <MdGroup />
              <span>Group</span>
            </GroupIcon>
          </div>
          <UserImageContainer>
            <UserImageList userIds={chatList} />
          </UserImageContainer>
        </DiaryRightNav>
      ) : null}
      <CreateDiaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDiary}
      />
    </DiaryPageContainer>
  );
};

export default DiaryPage;
