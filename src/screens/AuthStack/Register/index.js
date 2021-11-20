/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {Input, Checkbox} from 'native-base';
import MainLayout from '../../../containers/MainLayout';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../../../components/Universal/BackButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colors} from '../../../styles/base';
import styles from './style.js';

const loginValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .min(2, ({min}) => `Nama depan tidak boleh kurang dari ${min} karakter`)
    .required('Nama depan diperlukan'),
  lastname: yup
    .string()
    .min(2, ({min}) => `Nama depan tidak boleh kurang dari ${min} karakter`)
    .required('Nama belakang diperlukan'),
  email: yup
    .string()
    .email('Masukkan email yang sesuai')
    .required('Email diperlukan'),
  password: yup
    .string()
    .min(8, ({min}) => `Password harus memiliki kurang lebih ${min} karakter`)
    .required('Password Diperlukan'),
  ConfirmPassword: yup
    .string()
    .min(8, ({min}) => `Password harus memiliki kurang lebih ${min} karakter`)
    .oneOf([yup.ref('password')], 'Password harus sesuai')
    .required('Password Diperlukan'),
  accepted: yup.boolean().oneOf([true], 'Syarat dan ketentuan harus dicentang'),
});

const Register = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const loginHandle = async payload => {
    await setIsLoading(true);
    console.log(payload);
    await Alert.alert('Alert Title', '$(payload)', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    // Alert(payload);
    await setIsLoading(false);
  };
  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const updateConfirmSecureTextEntry = () => {
    setConfirmSecureTextEntry(!confirmSecureTextEntry);
  };

  const dataForm = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    ConfirmPassword: '',
    accepted: false,
  };

  return (
    <MainLayout boolean={isLoading}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>Daftar Akun</Text>
      <Text style={styles.text}>Informasi Umum</Text>
      <View style={styles.separator}>
        <View style={styles.form}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={dataForm}
            onSubmit={values => loginHandle(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              isValid,
            }) => (
              <>
                {/* firstName */}
                <View style={styles.ViewInput}>
                  <View style={styles.headerText}>
                    <Text>Nama depan</Text>
                  </View>
                  <Input
                    isInvalid={errors.firstname}
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    style={styles.InputText}
                    name="firstname"
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                    placeholder="Mohon masukkan nama depan anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                  {errors.firstname && (
                    <Text style={{fontSize: 14, color: 'red'}}>
                      {errors.firstname}
                    </Text>
                  )}
                </View>
                {/* lastName */}
                <View style={styles.ViewInput}>
                  <View style={styles.headerText}>
                    <Text>Nama belakang</Text>
                  </View>
                  <Input
                    isInvalid={errors.lastname}
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    style={styles.InputText}
                    name="firstname"
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                    placeholder="Mohon masukkan nama belakang anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                  {errors.lastname && (
                    <Text style={{fontSize: 14, color: 'red'}}>
                      {errors.lastname}
                    </Text>
                  )}
                </View>
                {/* email */}
                <View style={styles.ViewInput}>
                  <View style={styles.headerText}>
                    <Text>Email</Text>
                  </View>
                  <Input
                    isInvalid={errors.email}
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    style={styles.InputText}
                    name="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Mohon masukkan email anda"
                    placeholderTextColor="grey"
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text style={{fontSize: 14, color: 'red'}}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                {/* password */}
                <View style={styles.ViewInput}>
                  <View style={styles.headerText}>
                    <Text>Kata sandi</Text>
                  </View>
                  <Input
                    isInvalid={errors.password}
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    style={styles.InputText}
                    name="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Mohon masukkan kata sandi anda"
                    placeholderTextColor="grey"
                    secureTextEntry={secureTextEntry ? true : false}
                    InputRightElement={
                      <TouchableOpacity
                        style={styles.secureTextEntry}
                        onPress={updateSecureTextEntry}>
                        {secureTextEntry ? (
                          <Feather name="eye-off" size={20} color="grey" />
                        ) : (
                          <Feather name="eye" size={20} color={colors.orange} />
                        )}
                      </TouchableOpacity>
                    }
                  />
                  {errors.password && (
                    <Text style={{fontSize: 14, color: 'red'}}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                {/* Setpassword */}
                <View style={styles.ViewInput}>
                  <View style={styles.headerText}>
                    <Text>Konfirmasi kata sandi</Text>
                  </View>
                  <Input
                    isInvalid={errors.ConfirmPassword}
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    style={styles.InputText}
                    name="ConfirmPassword"
                    onChangeText={handleChange('ConfirmPassword')}
                    onBlur={handleBlur('ConfirmPassword')}
                    value={values.ConfirmPassword}
                    placeholder="Mohon masukkan kata sandi anda"
                    placeholderTextColor="grey"
                    secureTextEntry={secureTextEntry ? true : false}
                    InputRightElement={
                      <TouchableOpacity
                        style={styles.secureTextEntry}
                        onPress={updateConfirmSecureTextEntry}>
                        {confirmSecureTextEntry ? (
                          <Feather name="eye-off" size={20} color="grey" />
                        ) : (
                          <Feather name="eye" size={20} color={colors.orange} />
                        )}
                      </TouchableOpacity>
                    }
                  />
                  {errors.ConfirmPassword && (
                    <Text style={{fontSize: 14, color: 'red'}}>
                      {errors.ConfirmPassword}
                    </Text>
                  )}
                </View>

                <View style={styles.ViewInput}>
                  <Checkbox
                    value={values.accepted}
                    isChecked={values.accepted}
                    style={{
                      backgroundColor: values.accepted ? '#FFBC0D' : '#ECECEC',
                      borderColor: '#88889D',
                    }}
                    onChange={nextValue =>
                      setFieldValue('accepted', nextValue)
                    }>
                    Saya menyetujui Syarat dan ketentuan Hope
                  </Checkbox>
                  {errors.accepted && (
                    <Text style={{fontSize: 14, color: 'red'}}>
                      {errors.accepted}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  disabled={!isValid}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <View
                    style={
                      isValid ? styles.buttonMasuk : styles.buttonMasukDisable
                    }>
                    <Text style={styles.buttonTextMasuk}>DAFTAR</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </MainLayout>
  );
};

export default Register;
