import React from 'react';

import { Wrapper, SpinnerBlade } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  bladeNum: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ bladeNum = 12 }: { bladeNum: number }) => {
  const bladeNumArr = Array.from({ length: bladeNum }, (_, i) => i);

  return (
    <Wrapper>
      {bladeNumArr.map((_, i) => (
        <SpinnerBlade key={i} idx={i} total={bladeNum} />
      ))}
    </Wrapper>
  );
};

export default LoadingSpinner;
