import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface NotificationModalProps {
  onClose: () => void;
  notificationData: any[]; // Replace 'any[]' with the actual type of your notification data
}

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose, notificationData }) => {
  const navigate = useNavigate();
  const handleNavigation = (notificationType: string, returnId: string) => {
    if (notificationType === '게시물') {
      navigate(`/post/${returnId}`);
      onClose();
    } else {
      navigate(`/diary/${returnId}`);
      onClose();
    }
  };
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>Notifications</Title>
        <NotificationList>
          {notificationData.map((notification, index) => (
            <NotificationItem
              key={index}
              onClick={() => handleNavigation(notification.notificationType, notification.returnId)}
            >
              🔗
              {notification.content.split('@').map((part: any, index: number) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />}
                  {part.trim()}
                </React.Fragment>
              ))}
            </NotificationItem>
          ))}
        </NotificationList>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

export default NotificationModal;
