/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Profil,
  InfoObat,
  DetailObat,
  SearchMedicine,
  MainConsultation,
  ChatPasien,
} from '../screens';
import BottomNavigator from '../components/BottomNavigatior';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const KonsultasiStack = createStackNavigator();
const ObatStack = createStackNavigator();
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

const KonsultasiStackScrenn = ({navigation}) => {
  return (
    <KonsultasiStack.Navigator initialRouteName="Konsultasi">
      <KonsultasiStack.Screen
        name="Konsultasi"
        component={MainConsultation}
        options={{headerShown: false}}
      />
      <KonsultasiStack.Screen
        name="ChatPasien"
        component={ChatPasien}
        options={({route}) => ({
          title: route.params.data.user.name,
          headerStyle: {
            backgroundColor: '#FEB800',
            color: 'white',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                marginRight: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  alert('On Develop');
                }}>
                <Icon name="videocam" size={32} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alert('On Develop');
                }}>
                <Icon name="phone" size={28} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alert('On Develop');
                }}>
                <Entypo name="dots-three-vertical" size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </KonsultasiStack.Navigator>
  );
};

const ObatStackScreen = () => {
  return (
    <ObatStack.Navigator initialRouteName="Obat">
      <ObatStack.Screen
        name="Obat"
        component={InfoObat}
        options={{headerShown: false, headerTitleAlign: 'center'}}
      />
      <ObatStack.Screen
        name="Detail Obat"
        component={DetailObat}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
    </ObatStack.Navigator>
  );
};

const MainStack = props => {
  return (
    // <Tab.Navigator initialRouteName="Beranda">
    //   <Tab.Screen name="Beranda" component={HomeStackScreen} />
    //   <Tab.Screen name="Profil" component={AccountStackScreen} />
    // </Tab.Navigator>
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Dashboard"
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
        name="Konsultasi"
        component={KonsultasiStackScrenn}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'ChatPasien') {
              return false;
            }

            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Obat"
        component={ObatStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Detail Obat') {
              return false;
            }

            return true;
          })(route),
        })}
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
