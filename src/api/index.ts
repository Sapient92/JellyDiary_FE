import axios, { AxiosRequestConfig } from 'axios';

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
let refreshSubscribers = [];

const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
// 쿠키에서 특정 쿠키를 가져오는 함수
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url !== '/signin') {
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          originalRequest._retry = true;

          return new Promise((resolve, reject) => {
            const refreshToken = getCookie('refresh'); // 쿠키에서 리프레시 토큰을 가져옴

            api
              .post('/api/signin', null, {
                headers: {
                  refresh: refreshToken,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  const newToken = res.data.authorization;
                  localStorage.setItem('Authorization', newToken);
                  api.defaults.headers.common['Authorization'] = newToken;
                  originalRequest.headers['Authorization'] = newToken;

                  onRrefreshed(newToken);
                  refreshSubscribers = [];

                  resolve(api(originalRequest));
                } else {
                  reject(error);
                }
              })
              .catch((error) => {
                console.log('토큰 재발급 실패', error);
                reject(error);
              })
              .finally(() => {
                isTokenRefreshing = false;
              });
          });
        } else {
          return new Promise((resolve) => {
            addRefreshSubscriber((newToken) => {
              originalRequest.headers['Authorization'] = newToken;
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
