import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import color from '../../assets/colors';
import {
  IconHomeActive,
  IconHome,
  IconProfile,
  IconProfileActive,
  IconChat,
  IconChatActive,
  IconObat,
  IconObatActive,
} from '../../assets';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Dashboard') {
      return isFocused ? <IconHomeActive /> : <IconHome />;
    }
    if (label === 'Konsultasi') {
      return isFocused ? <IconChatActive /> : <IconChat />;
    }
    if (label === 'Obat') {
      return isFocused ? <IconObatActive /> : <IconObat />;
    }
    if (label === 'Profil') {
      return isFocused ? <IconProfileActive /> : <IconProfile />;
    }

    return <IconHome />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.IconFile}>
        <Icon />
        <Text style={styles.Text(isFocused)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  IconFile: {
    width: width / 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: isFocused => ({
    fontFamily: isFocused ? 'Poppins-SemiBold' : 'Poppins-Regular',
    fontSize: 12,
    color: isFocused ? color.orange : color.gray,
  }),
});
