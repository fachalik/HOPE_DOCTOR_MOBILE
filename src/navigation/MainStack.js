/* eslint-disable no-shadow */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profil, InfoObat, DetailObat, SearchMedicine} from '../screens';
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
      <HomeStack.Screen
        name="Info Obat"
        component={InfoObat}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <HomeStack.Screen
        name="Detail Obat"
        component={DetailObat}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <HomeStack.Screen
        name="SearchMedicine"
        component={SearchMedicine}
        options={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: {backgroundColor: 'white'},
          cardOverlayEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
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
