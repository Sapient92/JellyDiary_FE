import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface NotificationModalProps {
  onClose: () => void;
  onDelete: () => void;
  notificationData: any[]; // Replace 'any[]' with the actual type of your notification data
}
const notificationPaths = {
  구독: 'diary',
  '게시물 좋아요': 'post',
  다이어리: 'diary',
  '게시물 댓글': 'post',
  언급: 'post',
  '새로운 팔로워': 'diary',
  '메시지(DM)': 'dm',
};
const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  notificationData,
  onDelete,
}) => {
  const navigate = useNavigate();
  // const basePath = notificationPaths[notificationType];

  const handleNavigation = (notificationType: string, returnId: string) => {
    if (basePath) {
      // Navigate to the appropriate path
      navigate(`/${basePath}/${returnId}`);
      // Close the modal or perform any other necessary actions
      onClose();
    } else {
      console.error('Unknown notification type:', notificationType);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Close onClick={onClose}>X</Close>
        <Title>Notifications</Title>
        <NotificationList>
          {notificationData.map((notification, index) => (
            <NotificationItem key={index}>
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
        {notificationData.length > 0 ? (
          <DleteButton onClick={onDelete}>알림 전체 삭제</DleteButton>
        ) : (
          <div>알림이 없어요</div>
        )}
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
  height: 50%;
  overflow-y: auto;
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
const DleteButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Close = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: end;
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
