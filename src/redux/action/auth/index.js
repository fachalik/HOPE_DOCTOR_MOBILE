import {services} from '../../../utils/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = ({service, type = 'GET_USER', payload}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      services[service](payload).then(data => {
        dispatch({
          type,
          data: data.data,
        });
        console.log('data usaer', data);
      });
    });
  };
};

export const handleLogin = ({service, type = 'LOGIN', payload}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      services[service](payload)
        .then(data => {
          dispatch({
            type,
            data,
          });
          AsyncStorage.setItem('userToken', JSON.stringify(data));
          resolve(data);
        })
        .catch(error => reject(error));
    });
  };
};

export const handleLogout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT',
    });
    // ** Remove user, accessToken & refreshToken from localStorage
    AsyncStorage.clear();
  };
};
