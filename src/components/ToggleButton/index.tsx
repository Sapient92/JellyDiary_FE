import React, { useState } from 'react';
import { ToggleContainer } from './ToggleButton.styles';

// Destructure `state` from props
const ToggleButton = ({ state }: any) => {
  const [isOn, setIsOn] = useState(state);

  const toggleHandler = () => {
    setIsOn(!isOn); // Correct function name for setting state
  };

  return (
    <ToggleContainer onClick={toggleHandler}>
      <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`}></div>
      <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`}></div>
    </ToggleContainer>
  );
};

export default ToggleButton;
