import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profil, EditProfile} from '../screens';
import {BottomNavigator} from '../components/BottomNavigatior';

const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator initialRouteName="Profil">
      <AccountStack.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
    </AccountStack.Navigator>
  );
};

const MainStack = (props, {navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Beranda" component={HomeStackScreen} />
      <Tab.Screen name="Profile" component={AccountStackScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
