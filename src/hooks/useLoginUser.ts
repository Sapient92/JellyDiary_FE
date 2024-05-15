import api from "../api";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";

interface User {
  authority: string;
  commentTag: boolean;
  dm: boolean;
  newFollower: boolean;
  notificationSetting: boolean;
  postComment: boolean;
  postCreated: boolean;
  postLike: boolean;
  profileImg: null | string;
  userDesc: null | string;
  userId: number;
  userName: string;
  userState: string;
}

export interface LoginUserResult {
  isLoginUser: boolean;
  loading: boolean;
  userData: User | undefined;
}

const useLoginUser = (id?: string): LoginUserResult => {
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/profile`);
        setUserData(res.data.data);
        setIsLoginUser(res.data.data.userId === Number(id));
      } catch (e) {
        console.error("Failed to fetch user data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  return { isLoginUser, loading, userData };
};

export default useLoginUser;

export const useFetchLoginUser = () =>
  useQuery({
    queryKey: [queryKeys.loginUser],
    queryFn: () => api.get("/api/users/profile"),
    select: (data) => data.data.data,
  });
