import { FC } from "react";
import { ButtonTag } from "./Button.styles.ts";
import * as React from "react";

type ButtonProps = {
  className: string;
  children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ className, children }) => {
  return <ButtonTag className={className}>{children}</ButtonTag>;
};

export default Button;
