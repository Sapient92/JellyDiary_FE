import React from 'react';

import { IoPaw, IoPawOutline } from 'react-icons/io5';

interface LikeProps {
  like: boolean;
  onClick: () => void;
}

const LikeButton: React.FC<LikeProps> = ({ like, onClick }) => {
  return <div onClick={onClick}>{like ? <IoPaw /> : <IoPawOutline />}</div>;
};

export default LikeButton;
