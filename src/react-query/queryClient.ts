import { QueryCache, QueryClient } from "@tanstack/react-query";

// function errorHandler(errorMsg: string) {
//      console.log(errorMsg);
// }

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) => {
    //   //   errorHandler(error.message);
    // },
  }),
});
