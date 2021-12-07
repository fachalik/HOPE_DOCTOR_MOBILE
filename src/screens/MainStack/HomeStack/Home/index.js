import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './style.js';
import {
  Stack,
  HStack,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
  Avatar,
} from 'native-base';
import MainLayout from '../../../../containers/MainLayout';
import {IconAvatar} from '../../../../assets';
import colors from '../../../../assets/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MainLayout boolean={isLoading}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar
              bg="yellow.500"
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg',
              }}>
              BP
            </Avatar>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleRegular}>Hi, </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.headerTitleBold}>
                Bondan Prakoso
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text
              style={styles.headerTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              Mataram
            </Text>
            <MaterialIcon name="location-on" size={24} color={colors.orange} />
          </View>
        </View>
        <View style={styles.cardContainer}>
          {/* Chat Pasien */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchMedicine');
            }}>
            <Box borderRadius="md" style={styles.cardItem}>
              <Stack direction="row" style={{alignItems: 'center'}} space={3}>
                <MaterialIcon name="message" size={32} color={colors.orange} />
                <Text fontSize="lg" style={styles.cardTitle}>
                  Chat Pasien
                </Text>
              </Stack>
            </Box>
          </TouchableOpacity>
          {/* Chat Pasien */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Info Obat');
            }}>
            <Box borderRadius="md" style={styles.cardItem}>
              <Stack direction="row" style={{alignItems: 'center'}} space={3}>
                <MaterialIcon name="message" size={32} color={colors.orange} />
                <Text fontSize="lg" style={styles.cardTitle}>
                  Info Obat
                </Text>
              </Stack>
            </Box>
          </TouchableOpacity>
          {/* Chat Pasien */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchMedicine');
            }}>
            <Box borderRadius="md" style={styles.cardItem}>
              <Stack direction="row" style={{alignItems: 'center'}} space={3}>
                <MaterialIcon name="message" size={32} color={colors.orange} />
                <Text fontSize="lg" style={styles.cardTitle}>
                  Riwayat Konsultasi
                </Text>
              </Stack>
            </Box>
          </TouchableOpacity>
        </View>
      </MainLayout>
    </View>
  );
};

export default Home;