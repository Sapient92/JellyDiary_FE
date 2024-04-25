import React from 'react';

import { useIsFetching } from '@tanstack/react-query';

import LoadingSpinner from './LoadingSpinner';

export function Loading() {
  const isFetching = useIsFetching();
  const display = isFetching ? 'inherit' : 'none';

  return (
    <div style={{ display: display }}>
      <LoadingSpinner bladeNum={12} />
    </div>
  );
}
