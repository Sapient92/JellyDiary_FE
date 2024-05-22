import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { IoNotifications } from 'react-icons/io5';
import NotificationModal from './NotificationModal';
import api from '../../../../api';
import useUser from '../../../../hooks/useUser';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { toast, ToastContainer } from 'react-toastify';

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [notificationData, setNotificationData] = useState<any[]>([]);
  const [messages, setMessages] = useState<any>([]);
  const { user } = useUser();
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    const eventSource = new EventSource('https://api.jellydiary.life/api/subscribe', {
      // const eventSource = new EventSource('http://localhost:8080/api/subscribe', {
      headers: {
        Authorization: localStorage.getItem('Authorization') || '',
      },
      withCredentials: true,
    });

    eventSource.onmessage = function (event: any) {
      const newMessage = event.data;
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
      console.log(event.data.content);
    };

    eventSource.addEventListener('welcome', function (event: any) {
      const welcomeMessage = event.data;
      console.log(welcomeMessage);
      setMessages((prevMessages: any) => [...prevMessages, welcomeMessage]);
      toast(welcomeMessage);
    });

    eventSource.onerror = function (error: any) {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log('let');
    };
  }, []);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await api.get('/api/notification');
        setNotificationData(response.data.data.notificationResponseDtos);
        console.log(response.data.data.notificationResponseDtos);
        toast(response.data.data.notificationResponse[0].content);
        if (response.data.data.count > 0) {
          setHasNewNotifications(true); // Assuming the data indicates new notifications
        }
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchNotificationData();
  }, []);

  const handleNotificationClick = () => {
    setIsModalOpen(true);
    setHasNewNotifications(false); // After opening modal, reset the new notifications flag
  };
  const handleDeleteNotification = async () => {
    const response = await api.delete(`/api/notification/${user?.userId}`);
    console.log(response.data.data);
    toast(response.data.data);
    setNotificationData([]);
    setIsModalOpen(false);
  };
  return (
    <>
      <ToastContainer />
      <Noti onClick={handleNotificationClick}>
        <IoNotifications />
        {hasNewNotifications && <NewNotificationDot />}
      </Noti>
      {isModalOpen && (
        <NotificationModal
          onClose={() => handleDeleteNotification()}
          notificationData={notificationData}
        />
      )}
    </>
  );
};

// Styled components
const Noti = styled.div`
  position: relative;
`;

const NewNotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
`;

export default Notification;
