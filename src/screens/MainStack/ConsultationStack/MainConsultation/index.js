import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ListKonsultasi from '../ListKonsultasi';
import {colors} from '../../../../styles/base';
import MainLayout from '../../../../containers/MainLayout';
import styles from './style.js';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialTopTabNavigator();

const Mytabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Konsultasi terbaru"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        tabBarIndicatorStyle: {backgroundColor: colors.orange},
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="Konsultasi terbaru"
        component={ListKonsultasi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Riwayat konsultasi"
        component={ListKonsultasi}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const MainConsultation = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    // <Mytabs />
    // <MainLayout boolean={isLoading}>
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.headerText}>Konsultasi</Text>
        <View>
          <Icon name="questioncircleo" size={22} color={colors.gray} />
        </View>
      </View>
      <Mytabs />
    </View>
    // </MainLayout>
  );
};

export default MainConsultation;
