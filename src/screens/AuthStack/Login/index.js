/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {Input} from 'native-base';
import MainLayout from '../../../containers/MainLayout';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../../../components/Universal/BackButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colors} from '../../../styles/base';
import styles from './style.js';
import {useDispatch} from 'react-redux';
import {handleLogin} from '../../../redux/action/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Masukkan email yang sesuai')
    .required('Email diperlukan'),
  password: yup
    .string()
    .min(8, ({min}) => `Password harus memiliki kurang lebih ${min} karakter`)
    .required('Password Diperlukan'),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
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

  const dataForm = {email: '', password: ''};

  const handleRequest = async (service, payload) => {
    await dispatch(handleLogin({service, payload}))
      .then(value => {
        console.log(value);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = data => {
    handleRequest('login', data);
    AsyncStorage.setItem('test', 'test');
    // console.log(data);
  };

  return (
    <MainLayout boolean={isLoading}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.text}>Masukkan e-mail dan password akun anda</Text>
      <View style={styles.separator}>
        <View style={styles.form}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={dataForm}
            onSubmit={values => onSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
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
                <View style={styles.ViewInput}>
                  <View style={styles.headerText}>
                    <Text>Password</Text>
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
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <View
                    style={
                      isValid ? styles.buttonMasuk : styles.buttonMasukDisable
                    }>
                    <Text style={styles.buttonTextMasuk}>MASUK</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.textPrimary}>Belum Punya akun Hope ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textPrimaryActive}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
            style={{alignItems: 'center', marginVertical: 15}}>
            <Text style={styles.textPrimaryActive}>Lupa Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default Login;
