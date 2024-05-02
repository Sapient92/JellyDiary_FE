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
    if (token && config.url !== '/reissue' && config.url !== '/login') {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isTokenRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url !== '/login') {
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          return await api
            .post('/reissue')
            .then((res) => {
              if (res.status === 200) {
                api.defaults.headers.common['Authorization'] = res.headers.Authorization;
                originalRequest.headers['Authorization'] = res.headers.Authorization;
                localStorage.setItem('Authorization', res.headers.Authorization);
                originalRequest._retry = false;
                if (originalRequest.method === 'post') {
                  return api.post(originalRequest.url, originalRequest.data);
                } else if (originalRequest.method === 'get') {
                  return api.get(originalRequest.url, {
                    params: originalRequest.params,
                  });
                } else if (originalRequest.method === 'put') {
                  return api.put(originalRequest.url, originalRequest.data);
                } else if (originalRequest.method === 'delete') {
                  return api.delete(originalRequest.url);
                } else if (originalRequest.method === 'patch') {
                  return api.patch(originalRequest.url);
                }
              }
            })
            .catch((error) => {
              console.log('토큰 재발급 실패', error);
              return Promise.reject(error);
            })
            .finally(() => {
              isTokenRefreshing = false;
            });
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
