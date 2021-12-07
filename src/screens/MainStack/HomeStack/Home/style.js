import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  padding,
  dimensions,
  widthPercent,
} from '../../../../styles/base';

console.log(dimensions.fullWidth);
const panelStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    width: dimensions.fullWidth / 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerTitleBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  headerTitleRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  headerTitleEmail: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  cardContainer: {
    marginVertical: 20,
  },
  cardItem: {
    paddingHorizontal: dimensions.fullWidth - 380,
    paddingVertical: 20,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});

export default panelStyles;
