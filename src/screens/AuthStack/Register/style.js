import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  padding,
  dimensions,
  widthPercent,
} from '../../../styles/base';

const panelStyles = StyleSheet.create({
  title: {
    fontFamily: fonts.primary_bold,
    fontSize: fonts.xl,
  },
  text: {
    fontFamily: fonts.secondary_semiBold,
    fontSize: fonts.md,
    color: colors.gray,
  },
  form: {
    marginVertical: padding.sm,
  },
  headerText: {
    fontFamily: 'Karla-Regular',
    fontSize: fonts.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: padding.sm,
  },
  InputText: {
    fontFamily: 'Karla-Regular',
    fontSize: fonts.md,
    color: colors.black,
  },
  InputWarning: {
    marginTop: 5,
    fontFamily: fonts.secondary,
    fontSize: fonts.sm,
    color: colors.warning,
  },
  ViewInput: {
    paddingBottom: padding.md,
  },
  buttonMasuk: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.orange,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercent.full,
    height: 48,
    borderRadius: 4,
  },
  buttonMasukDisable: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.gray,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercent.full,
    height: 48,
    borderRadius: 4,
  },
  buttonTextMasuk: {
    fontSize: 16,
    fontFamily: 'Karla-Bold',
    color: colors.white,
  },
  separator: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  secureTextEntry: {
    marginHorizontal: padding.sm,
  },
  textPrimary: {
    fontFamily: fonts.secondary,
    fontSize: fonts.md - 4,
    marginHorizontal: 2,
  },
  textPrimaryActive: {
    fontFamily: fonts.secondary_bold,
    fontSize: fonts.md - 4,
    color: colors.orange,
    marginHorizontal: 2,
  },
});

export default panelStyles;
