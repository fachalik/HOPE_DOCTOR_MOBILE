import {Dimensions} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#FFBC0D',
  secondary: '#ECECEC',
  tertiary: '#5DA6A7',
  white: '#F9F9F9',
  black: '#000000',
  orange: '#FFBC0D',
  soft_orange: '#EBBC6E',
  soft_gray: '#ECECEC',
  gray: '#88889D',
  gray_dark: '#7C7C7C',
  soft_grayOrange: '#F7F6F1',
  backgroundColor: '#FFFFFF',
  warning: '#CF212A',
  transparent: 'rgba(52, 52, 52, 0.8)',
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
  xxl: 50,
};

export const widthPercent = {
  full: '100%',
  half: '50%',
};

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  xl: 36,
  primary: 'Poppins-Regular',
  primary_bold: 'Poppins-Bold',
  primary_semiBold: 'Poppins-SemiBold',
  secondary: 'Karla-Regular',
  secondary_bold: 'Karla-Bold',
  secondary_semiBold: 'Karla-SemiBold',
};
