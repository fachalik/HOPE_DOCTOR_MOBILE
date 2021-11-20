import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginRegistOnBoard,
  Login,
  Register,
  ForgetPassword,
  RegistComplete,
  TestRedux,
} from '../screens';
const Stack = createStackNavigator();
const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginRegistOnBoard"
        component={LoginRegistOnBoard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TestRedux"
        component={TestRedux}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistComplete"
        component={RegistComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
