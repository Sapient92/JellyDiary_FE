import api from "../api";
import { useEffect, useState } from "react";

export interface LoginUserResult {
  isLoginUser: boolean;
  loading: boolean;
}

const useLoginUser = (id: string): LoginUserResult => {
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/profile`);
        setIsLoginUser(res.data.data.userId === Number(id));
      } catch (e) {
        console.error("Failed to fetch user data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  return { isLoginUser, loading };
};

export default useLoginUser;
