// Modal.js
import { ModalContainer, ModalContent } from './Modal.styles';

const Modal = ({ show, onClose, onDiary, onUserPage }: any) => {
  if (!show) {
    return null;
  }

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent>
        <div>
          <button onClick={onDiary}>다이어리로 이동</button>
        </div>
        <div>
          <button onClick={onUserPage}>유저 피드로 이동</button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
