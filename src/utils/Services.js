/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

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

const api = {
  get: url => useAPI({method: 'get', url: `${url}`}),
  delete: url => useAPI({method: 'delete', url: `${url}`}),
  patch: (url, data) => useAPI({method: 'patch', url: `${url}`, data}),
  post: (url, data) => useAPI({method: 'post', url: `${url}`, data}),
};

// const ssoUrl = process.env.REACT_APP_API_URL;
export const services = {
  // Service examples
  // getAllData: () => api.get('endpoint'),
  // // getAllDataWithQuery: ({ qs }) => api.get(`endpoint${qs}`),
  // getDataByParam: param => api.get(`endpoint/${param}`),
  // patchData: (param, data) => api.patch(`endpoint/${param}`, data),
  // postData: data => api.post('endpoint', data),
  // deleteData: param => api.delete(`endpoint/${param}`),
  // // Add real API implement
  login: data =>
    api.post('https://hope-mvp-backend.herokuapp.com/api/v1/auth/login/', data),
  fetchUsers: () => api.get('https://jsonplaceholder.typicode.com/users'),
};
