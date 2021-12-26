import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector} from 'react-redux';
const MainApp = () => {
  const [isLogin, setIsLogin] = useState(null);
  const authStore = useSelector(state => state.auth.userToken.result);

  return <>{!!authStore && authStore.access ? <MainStack /> : <AuthStack />}</>;
};

export default MainApp;
