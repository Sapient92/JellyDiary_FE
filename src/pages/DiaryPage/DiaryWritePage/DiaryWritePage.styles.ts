// Modal.styles.js

import styled from 'styled-components';

export const ModalContainer = styled.div`
  z-index: 2;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 80%;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;

  h2 {
    margin: 0;
  }

  svg {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  margin: 20px 0;

  input[type='file'] {
    margin-top: 10px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 10px;
  }
`;

export const Input = styled.input`
  width: 90%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 90%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
