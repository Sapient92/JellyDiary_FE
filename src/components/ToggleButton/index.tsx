import React, { useState, useEffect } from 'react';
import { ToggleContainer } from './ToggleButton.styles';
interface ToggleButtonProps {
  state: boolean;
  onToggle?: (newState: boolean) => void; // Optional callback prop
}

const ToggleButton = ({ state, onToggle }: ToggleButtonProps) => {
  const [isOn, setIsOn] = useState(state);

  useEffect(() => {
    setIsOn(state);
  }, [state]);

  const toggleHandler = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState); // Call the callback with new state if provided
  };

  return (
    <ToggleContainer onClick={toggleHandler}>
      <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`}></div>
      <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`}></div>
    </ToggleContainer>
  );
};
export default ToggleButton;
