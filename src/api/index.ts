import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const config: AxiosRequestConfig = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const api = axios.create(config);

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    if (token && config.url !== '/signin' && config.url !== '/login') {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isTokenRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 쿠키에서 특정 쿠키를 가져오는 함수
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url !== '/signin') {
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          originalRequest._retry = true;

          const refreshToken = getCookie('refresh'); // 쿠키에서 리프레시 토큰을 가져옴

          if (!refreshToken) {
            return Promise.reject(error);
          }

          try {
            const response = await api.post('/api/reissue', null, {
              headers: {
                refresh: refreshToken,
              },
            });

            if (response.status === 200) {
              const newToken = response.data.authorization;
              localStorage.setItem('Authorization', newToken);
              api.defaults.headers.common['Authorization'] = newToken;

              onRefreshed(newToken);
              return api(originalRequest);
            } else {
              return Promise.reject(error);
            }
          } catch (err) {
            console.log('토큰 재발급 실패', err);
            return Promise.reject(err);
          } finally {
            isTokenRefreshing = false;
          }
        } else {
          return new Promise((resolve) => {
            addRefreshSubscriber(() => {
              resolve(api(originalRequest));
            });
          });
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
