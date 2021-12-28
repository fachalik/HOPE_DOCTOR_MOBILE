/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MainLayout from '../../../../containers/MainLayout';
import styles from './style.js';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../styles/base';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {services} from '../../../../utils/Services';
import {handleRefreshToken} from '../../../../redux/action/auth';

const ListKonsultasi = () => {
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);
  const [convData, setConvData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(authStore.userData.result.ID);
  const navigation = useNavigation();

  const getRefreshToken = async (service, payload) => {
    var token = '';
    await dispatch(handleRefreshToken({service, payload}))
      .then(value => {
        console.log(value);
        token = value.result.access;
      })
      .catch(error => {
        console.log(error);
      });
    return token;
  };

  useEffect(() => {
    const fetchAllConv = async () => {
      const refreshToken = {
        refresh: authStore.userToken.result.refresh,
      };
      const token = await getRefreshToken('refreshToken', refreshToken);
      const ID = await authStore.userData.result.ID;
      services
        .fetchAllConversation(token, ID)
        .then(dataConv => {
          // console.log(data);
          setConvData(dataConv.result);
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchAllConv();
  }, []);

  // console.log(convData);
  const renderListPasien = () => {
    return convData.map((item, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          onPress={() =>
            navigation.navigate('ChatPasien', {
              data: {
                createdAt: new Date(),
                message: item.chats,
                user: {
                  _id: 2,
                  name: item.ID,
                  // avatar: item.image,
                },
              },
            })
          }>
          <View style={styles.Kontak}>
            {/* <FastImage
              source={{uri: item.image}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100 / 2,
                resizeMode: 'cover',
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <View style={styles.itemKontak}>
              <Text style={styles.itemName}>{item.ID}</Text>
              <Text style={styles.itemMessage}>{item.chats[0].message}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    // <View style={{backgroundColor: colors.backgroundColor}}>
    <View
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: colors.backgroundColor,
      }}>
      <TouchableOpacity
        onPress={() => {
          alert('test');
        }}>
        <View style={styles.searchBar}>
          <View style={{marginRight: 10}}>
            <Icon name="search1" size={20} color={colors.gray} />
          </View>
          <View>
            <Text>Cari nama pasien </Text>
          </View>
        </View>
      </TouchableOpacity>
      {renderListPasien()}
    </View>
  );
};

export default ListKonsultasi;
