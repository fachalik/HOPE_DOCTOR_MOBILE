/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MainLayout from '../../../../containers/MainLayout';
import styles from './style.js';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../styles/base';
import Icon from 'react-native-vector-icons/AntDesign';
import {data} from './data';
import FastImage from 'react-native-fast-image';

const ListKonsultasi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const renderListPasien = () => {
    return data.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate('ChatPasien', {
              data: {
                createdAt: new Date(),
                message: item.message,
                user: {
                  _id: 2,
                  name: item.nama,
                  avatar: item.image,
                },
              },
            })
          }>
          <View style={styles.Kontak}>
            <FastImage
              source={{uri: item.image}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100 / 2,
                resizeMode: 'cover',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.itemKontak}>
              <Text style={styles.itemName}>{item.nama}</Text>
              <Text style={styles.itemMessage}>{item.message[0]}</Text>
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
