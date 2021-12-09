import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  padding,
  dimensions,
  widthPercent,
} from '../../../../styles/base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

console.log(dimensions.fullWidth);
const panelStyles = StyleSheet.create({
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
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
  },
});

export default panelStyles;
