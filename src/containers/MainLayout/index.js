import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  View,
} from 'react-native';
import colors from '../../assets/colors';
import LoadingV2 from '../../components/Universal/LoadingV2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MainLayout = ({children, boolean}) => {
  return (
    <ScrollView behavior="height" style={styles.container}>
      <View style={styles.wrapper}>{children}</View>
      {boolean ? <LoadingV2 /> : null}
    </ScrollView>
  );
};

export default MainLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.backgroundColor,
  },
  wrapper: {
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
  },
});
