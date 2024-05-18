import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  button {
    border: 0;
    background-color: transparent;
    background-color: none;
  }
`;
