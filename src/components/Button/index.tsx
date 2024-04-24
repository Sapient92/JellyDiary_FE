import React, { FC } from "react";

import { ButtonTag } from "./Button.styles.ts";

type ButtonProps = {
  className: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <ButtonTag onClick={onClick} className={className}>
      {children}
    </ButtonTag>
  );
};

export default Button;
