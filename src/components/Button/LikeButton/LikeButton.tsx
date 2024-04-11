import React from "react";
import { IoPaw, IoPawOutline } from "react-icons/io5";

const LikeButton = ({ like, onClick }) => {
  return <div onClick={onClick}>{like ? <IoPaw /> : <IoPawOutline />}</div>;
};

export default LikeButton;
