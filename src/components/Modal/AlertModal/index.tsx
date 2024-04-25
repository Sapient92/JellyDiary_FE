import React, { ReactNode } from "react";

import {
  AlertModalContainer,
  AlertModalContent,
} from "./AlertModal.styles.tsx";

interface AlertModalProps {
  children: ReactNode;
  type: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ children, type }) => {
  return (
    <AlertModalContainer className={type}>
      <AlertModalContent>
        <p>{children}</p>
      </AlertModalContent>
    </AlertModalContainer>
  );
};

export default AlertModal;
