/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, createRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../../../config';
import colors from '../../../../assets/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LoadingV2 from '../../../../components/Universal/LoadingV2';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {handleRefreshToken} from '../../../../redux/action/auth';
import {useDispatch} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import MainLayout from '../../../../containers/MainLayout';
import ActionSheet from 'react-native-actions-sheet';

const DetailObat = ({route, navigation}) => {
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const [detail, setDetail] = useState({
    name: '',
    harga: '',
    deskrips: '',
    manfaat: '',
    komposisi: '',
    dosis: '',
    penyajian: '',
    efekSamping: '',
    produsen: '',
    perhatian: '',
  });

  const DetailItem = createRef();

  const handleSnap = item => {
    setDetail({
      ...data,
      name: item.name,
      harga: item.price_range,
      deskripsi: item.description,
      manfaat: item.benefits,
      komposisi: item.composition,
      dosis: item.dosage,
      penyajian: item.serving,
      efekSamping: item.side_effect,
      produsen: item.producer,
      perhatian: item.consideration,
    });
    DetailItem.current?.setModalVisible();
  };

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

  useEffect(async () => {
    setIsLoading(true);
    const refreshToken = {
      refresh: authStore.userToken.result.refresh,
    };
    const token = await getRefreshToken('refreshToken', refreshToken);
    console.log(token);
    await axios
      .get(config.API_URL_NEW + 'medicine/?kind=' + route.params.request, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(function (response) {
        setIsData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
    await setIsLoading(false);
  }, []);

  const Obat = () => {
    return data.map(item => {
      return (
        <View
          key={item.ID}
          style={{
            borderRadius: 4,
            backgroundColor: colors.backgroundColor,
            padding: 20,
            marginBottom: 30,
            marginHorizontal: wp('1%'),
            textAlign: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 2,
            justifyContent: 'space-between',
          }}>
          <View>
            <View
              style={{
                width: wp('30%'),
                height: wp('30%'),
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: colors.backgroundColor,
                borderRadius: 150 / 2,
                marginVertical: 5,
                shadowColor: colors.gray,
                marginBottom: 10,
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 10,
              }}>
              <FastImage
                source={{uri: item.image}}
                style={{
                  width: wp('25%'),
                  height: wp('25%'),
                  borderRadius: 100 / 2,
                  resizeMode: 'cover',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Karla-Bold',
                  fontSize: 10,
                  textAlign: 'left',
                  width: wp('25%'),
                }}>
                {item.name}
              </Text>
              <Text style={{fontFamily: 'Karla-Bold', fontSize: 10}}>
                {item.price_range}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                handleSnap(item);
              }}
              style={{
                marginTop: 10,
                borderRadius: 4,
                backgroundColor: colors.backgroundColor,
                borderWidth: 1,
                borderColor: colors.orange,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontSize: 10,
                  fontFamily: 'Poppins-Medium',
                }}>
                Detail Informasi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };
  return (
    <>
      <ActionSheet gestureEnabled={true} ref={DetailItem}>
        <View style={{marginHorizontal: wp('5%')}}>
          <Text style={styles.bigTitle}>{detail.name}</Text>
          <Text style={styles.title}>Harga</Text>
          <Text style={styles.contents}>{detail.harga}</Text>
          <Text style={styles.title}>Deskripsi</Text>
          <Text style={styles.contents}>{detail.deskripsi}</Text>
          <Text style={styles.title}>Manfaat</Text>
          <Text style={styles.contents}>{detail.manfaat}</Text>
          <Text style={styles.title}>Komposisi</Text>
          <Text style={styles.contents}>{detail.komposisi}</Text>
          <Text style={styles.title}>Dosis</Text>
          <Text style={styles.contents}>{detail.dosis}</Text>
          <Text style={styles.title}>Penyajian</Text>
          <Text style={styles.contents}>{detail.penyajian}</Text>
          <Text style={styles.title}>Efek Samping</Text>
          <Text style={styles.contents}>{detail.efekSamping}</Text>
          <Text style={styles.title}>Produsen</Text>
          <Text style={styles.contents}>{detail.produsen}</Text>
          <Text style={styles.title}>Perhatian</Text>
          <Text style={styles.contents}>{detail.perhatian}</Text>
        </View>
      </ActionSheet>
      <MainLayout boolean={isLoading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchMedicine');
          }}>
          <View style={styles.searchBar}>
            <View style={{marginRight: 10}}>
              <Icon name="search1" size={20} color={colors.gray} />
            </View>
            <View>
              <Text>Cari Obatmu!</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={{fontFamily: 'Karla-Bold'}}>Pilihan produk kesehatan</Text>
        <View style={styles.itemObat}>{!isLoading ? <Obat /> : null}</View>
      </MainLayout>
    </>
  );
};

export default DetailObat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
  itemObat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
    marginBottom: 100,
  },
  header: {
    backgroundColor: colors.gray,
    shadowRadius: 2,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
  },
  contents: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bigTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.gray,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});
