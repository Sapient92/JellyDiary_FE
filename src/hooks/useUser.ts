import { AxiosResponse } from 'axios';

import type { User } from '../types/userType';

import api from '../api';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../react-query/constants';
import { queryClient } from '../react-query/queryClient';

async function getUser() {
  const { data }: AxiosResponse<{ data: User }> = await api.get(`/api/users/profile`);
  return data.data;
}
const useUser = () => {
  const { data: user } = useQuery({
    enabled: !!queryKeys.user,
    queryKey: [queryKeys.user],
    queryFn: () => getUser(),
    staleTime: Infinity,
  });

  function updateUser(newUser: User): void {
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  function clearUser() {
    queryClient.removeQueries({ queryKey: [queryKeys.user] });
  }

  return { user, updateUser, clearUser };
};

export default useUser;
