import axios from 'axios';
import store from '../redux/store';

const api = axios.create({
    baseURL: process.env.LOCAL_NODE_URL
  });
  
api.interceptors.request.use(
    config => {
        const authToken = store?.getState().user?.userData?.token;
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        } 

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
