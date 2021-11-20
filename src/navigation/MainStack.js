/* eslint-disable no-shadow */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profil} from '../screens';
import BottomNavigator from '../components/BottomNavigatior';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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

const MainStack = props => {
  return (
    // <Tab.Navigator initialRouteName="Beranda">
    //   <Tab.Screen name="Beranda" component={HomeStackScreen} />
    //   <Tab.Screen name="Profil" component={AccountStackScreen} />
    // </Tab.Navigator>
    <Tab.Navigator
      initialRouteName="Beranda"
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Beranda"
        component={HomeStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';

            if (
              routeName === 'ChatBotScreen' ||
              routeName === 'Info Obat' ||
              routeName === 'Detail Obat' ||
              routeName === 'Develop' ||
              routeName === 'Layanan Kesehatan' ||
              routeName === 'SearchMedicine' ||
              routeName === 'DetailSearchMedicine' ||
              routeName === 'SearchLayananKesehatan' ||
              routeName === 'DetailLayananKesehatan' ||
              routeName === 'DetailSearchLayananKesehatan'
            ) {
              return false;
            }

            return true;
          })(route),
        })}
        tabBarOptions={{
          style: {
            position: 'absolute',
            color: 'red',
            backgroundColor: 'yellow',
          },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={AccountStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Edit Profile') {
              return false;
            }

            return true;
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
