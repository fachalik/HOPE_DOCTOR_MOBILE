import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleLogout} from '../../../../redux/action/auth';

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => dispatch(handleLogout())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
