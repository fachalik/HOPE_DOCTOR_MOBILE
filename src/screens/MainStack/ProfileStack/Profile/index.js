import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleLogout} from '../../../../redux/action/auth';
import MainLayout from '../../../../containers/MainLayout';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../../assets/colors';
import {useSelector} from 'react-redux';
import {
  Avatar,
  Box,
  Text as TextNB,
  HStack,
  VStack,
  Spacer,
  Center,
  Divider,
} from 'native-base';

import {truncate} from '../../../../utils/Utils';

const Profile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData.result);
  console.log(userData);
  const ADevider = ({children}) => {
    return (
      <Box my={5}>
        <Divider />
        {children}
        <Divider />
      </Box>
    );
  };

  const ABDevider = ({children}) => {
    return (
      <Box>
        <Box mb={3}>{children}</Box>
        {/* <Divider /> */}
      </Box>
    );
  };

  return (
    <MainLayout>
      <HStack>
        <Center>
          <Text style={styles.headerText}>Profil</Text>
        </Center>
        <Spacer />
        <Center>
          <Icon name="questioncircleo" size={22} color={colors.gray} />
        </Center>
      </HStack>
      <ADevider>
        <TouchableOpacity onPress={() => navigation.navigate('Detail Profil')}>
          <HStack tack space={2} my={3}>
            <Center>
              <Avatar bg="orange.300" size={'lg'}>
                {`${userData.first_name.charAt(0)} ${userData.last_name.charAt(
                  0,
                )}`}
              </Avatar>
            </Center>
            <VStack>
              <TextNB fontSize={'2xl'} bold margin={0}>
                {truncate(`${userData.first_name} ${userData.last_name}`, 23)}
              </TextNB>
              <TextNB fontSize={'sm'} margin={0}>
                {userData.email}
              </TextNB>
            </VStack>
            <Spacer />
            <Center>
              <Entypo name="chevron-right" size={22} color={colors.gray} />
            </Center>
          </HStack>
        </TouchableOpacity>
      </ADevider>
      <ABDevider>
        <TouchableOpacity onPress={() => dispatch(handleLogout())}>
          <HStack space={2}>
            <Center>
              <Icon name="logout" size={22} color={colors.gray} />
            </Center>
            <Center>
              <TextNB fontSize={'md'}>Keluar dari akun</TextNB>
            </Center>
            <Spacer />
            <Center>
              <Entypo name="chevron-right" size={22} color={colors.gray} />
            </Center>
          </HStack>
        </TouchableOpacity>
      </ABDevider>
    </MainLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 29,
    textAlign: 'center',
  },
});
