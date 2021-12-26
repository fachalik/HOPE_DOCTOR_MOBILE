import {services} from '../../../utils/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = ({service, type = 'GET_USER', token, payload}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      services[service](token, payload)
        .then(data => {
          dispatch({
            type,
            data,
          });
          AsyncStorage.setItem('userData', JSON.stringify(data));
          // console.log(data);
          resolve(data);
        })
        .catch(error => reject(error));
    });
  };
};

export const handleLogin = ({service, type = 'LOGIN', payload}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      console.log(payload);
      services[service](payload)
        .then(data => {
          dispatch({
            type,
            data,
          });
          AsyncStorage.setItem('userToken', JSON.stringify(data.result.access));
          AsyncStorage.setItem(
            'refreshToken',
            JSON.stringify(data.result.refresh),
          );
          resolve(data);
        })
        .catch(error => reject(error));
    });
  };
};

export const handleRefreshToken = ({
  service,
  type = 'REFRESH_TOKEN',
  payload,
}) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      services[service](payload)
        .then(data => {
          dispatch({
            type,
            data: {
              result: {
                access: data.result.access,
                refresh: payload.refresh,
              },
            },
          });
          AsyncStorage.setItem('userToken', JSON.stringify(data.result.access));
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
