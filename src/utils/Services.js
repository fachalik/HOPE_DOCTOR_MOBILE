/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAPI = ({method, url, data}) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {'Content-Type': 'application/json'},
      crossDomain: true,
      method,
      url,
      data,
      validateStatus: false,
    })
      .then(({data}) => resolve(data))
      .catch(err => reject(err));
  });
};

const getUseAPIWithToken = ({method, url, token}) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      crossDomain: true,
      method,
      url,
      validateStatus: false,
    })
      .then(({data}) => resolve(data))
      .catch(err => reject(err));
  });
};

const useAPIWithToken = ({method, url, token, data}) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      crossDomain: true,
      method,
      url,
      data,
      validateStatus: false,
    })
      .then(({data}) => resolve(data))
      .catch(err => reject(err));
  });
};

const api = {
  get: url => useAPI({method: 'get', url: `${url}`}),
  delete: url => useAPI({method: 'delete', url: `${url}`}),
  patch: (url, data) => useAPI({method: 'patch', url: `${url}`, data}),
  post: (url, data) => useAPI({method: 'post', url: `${url}`, data}),
  getWithToken: (url, token) =>
    getUseAPIWithToken({method: 'get', url: `${url}`, token}),
  deleteWithToken: url => useAPIWithToken({method: 'delete', url: `${url}`}),
  patchWithToken: (url, data) =>
    useAPIWithToken({method: 'patch', url: `${url}`, data}),
  postWithToken: (url, data, token) =>
    useAPIWithToken({method: 'post', url: `${url}`, data}),
  putWithToken: (url, data, token) =>
    useAPIWithToken({method: 'put', url: `${url}`, token, data}),
};

// const ssoUrl = process.env.REACT_APP_API_URL;
export const services = {
  // // Add real API implement
  login: data => api.post(`${config.API_URL_NEW}auth/login/`, data),
  getUser: (token, datax) =>
    api.getWithToken(`${config.API_URL_NEW}user/me/`, token),
  refreshToken: data =>
    api.post(`${config.API_URL_NEW}auth/login/refresh`, data),
  fetchUsers: () => api.get('https://jsonplaceholder.typicode.com/users'),
  fetchAllConversation: (token, params) =>
    api.getWithToken(
      `${config.API_URL_NEW}conversation?userID=${params}`,
      token,
    ),
  fetchAllConversationByID: (token, params) =>
    api.getWithToken(`${config.API_URL_NEW}conversation/${params}`, token),
  UpdateProfile: (token, data) =>
    api.putWithToken(`${config.API_URL_NEW}user/me`, token, data),
};
