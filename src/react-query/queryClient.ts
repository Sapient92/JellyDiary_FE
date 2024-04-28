import { QueryCache, QueryClient } from '@tanstack/react-query';

// 전역 오류 처리 함수
function globalErrorHandler(error: Error) {
  console.error('An error occurred:', error);
}

// QueryClient 인스턴스 생성
export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: globalErrorHandler,
    },
  },
  queryCache: new QueryCache({
    onError: globalErrorHandler,
  }),
});
