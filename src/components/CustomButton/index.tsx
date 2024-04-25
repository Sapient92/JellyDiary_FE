import React from 'react';

import { StyledButton } from './CustomButton.styles.ts';

interface ButtonProps {
  text: string;
  backgroundColor: string;
  disabled: boolean;
  onClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ text, backgroundColor, disabled, onClick }) => {
  return (
    <StyledButton disabled={disabled} backgroundColor={backgroundColor} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default CustomButton;
