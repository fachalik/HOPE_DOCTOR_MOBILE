import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getUser} from '../../../redux/action/auth';

const TestRedux = () => {
  const dispatch = useDispatch();

  const handleRequest = async (service, payload) => {
    await dispatch(getUser({service, payload}))
      .then(value => {
        console.log(value);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const justClick = () => {
    handleRequest('fetchUsers');
  };
  return (
    <View>
      <Text>Test Redux</Text>
      <TouchableOpacity onPress={() => justClick()}>
        <Text>asd</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestRedux;

const styles = StyleSheet.create({});
