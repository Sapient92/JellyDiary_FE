import { FC } from "react";
import { ButtonTag } from "./Button.styles.ts";
import * as React from "react";

type ButtonProps = {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <ButtonTag onClick={onClick} className={className}>
      {children}
    </ButtonTag>
  );
};

export default Button;
