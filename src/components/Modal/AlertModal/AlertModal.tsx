import {
  AlertModalContainer,
  AlertModalContent,
} from "./AlertModal.styles.tsx";
import React, { ReactNode } from "react";

type AlertModal = {
  children: ReactNode;
  type: string;
};

const AlertModal: React.FC<AlertModal> = ({ children, type }) => {
  return (
    <AlertModalContainer className={type}>
      <AlertModalContent>
        <p>{children}</p>
      </AlertModalContent>
    </AlertModalContainer>
  );
};

export default AlertModal;
