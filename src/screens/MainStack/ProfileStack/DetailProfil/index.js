import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import MainLayout from '../../../../containers/MainLayout';
import {
  Avatar,
  Text as TextNB,
  Center,
  Input,
  FormControl,
  Box,
  Button,
} from 'native-base';
import {Formik, Form} from 'formik';

const DetailProfil = () => {
  const userData = useSelector(state => state.auth.userData.result);
  const [data, setData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    psychologist_profile: {
      location: userData.profile.location,
      lisence: userData.profile.lisence,
      membership_number: String(userData.profile.membership_number),
      experience: userData.profile.experience,
      topic_category: userData.profile.topic_category,
      specialization: userData.profile.specialization,
    },
  });
  return (
    <MainLayout>
      {!!userData && (
        <>
          <Center>
            <Avatar bg="orange.300" size={'xl'} mb={3}>
              {`${userData.first_name.charAt(0)} ${userData.last_name.charAt(
                0,
              )}`}
            </Avatar>
            <TouchableOpacity onPress={() => alert('test')}>
              <TextNB fontSize={'lg'} bold style={styles.pictureText}>
                Ubah Foto
              </TextNB>
            </TouchableOpacity>
          </Center>
          <Formik
            enableReinitialize={true}
            initialValues={data}
            onSubmit={(values, actions) => {
              console.log(values);
            }}>
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
                {console.log(values)}
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Nomor Member</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange(
                      'psychologist_profile.membership_number',
                    )}
                    onBlur={handleBlur(
                      'psychologist_profile.membership_number',
                    )}
                    value={values.psychologist_profile.membership_number}
                    autoCapitalize="none"
                    style={styles.InputText}
                    id="membership_number"
                    name="psychologist_profile.membership_number"
                    placeholder="Mohon masukkan nomor member anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Nama awal</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    value={values.first_name}
                    autoCapitalize="none"
                    style={styles.InputText}
                    name="first_name"
                    placeholder="Mohon masukkan nama awal anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Nama akhir</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    value={values.last_name}
                    autoCapitalize="none"
                    style={styles.InputText}
                    name="last_name"
                    placeholder="Mohon masukkan nama akhir anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Location</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange('psychologist_profile.location')}
                    onBlur={handleBlur('psychologist_profile.location')}
                    value={values.psychologist_profile.location}
                    autoCapitalize="none"
                    style={styles.InputText}
                    id="location"
                    name="psychologist_profile.location"
                    placeholder="Mohon masukkan nama lokasi anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Lisensi</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange('psychologist_profile.lisence')}
                    onBlur={handleBlur('psychologist_profile.lisence')}
                    value={values.psychologist_profile.lisence}
                    autoCapitalize="none"
                    style={styles.InputText}
                    id="lisence"
                    name="psychologist_profile.lisence"
                    placeholder="Mohon masukkan lisensi anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Experiance</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange(
                      'psychologist_profile.experience',
                    )}
                    onBlur={handleBlur('psychologist_profile.experience')}
                    value={values.psychologist_profile.experience}
                    autoCapitalize="none"
                    style={styles.InputText}
                    id="experiance"
                    name="psychologist_profile.experience"
                    placeholder="Mohon masukkan experiance anda anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Kategori</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange(
                      'psychologist_profile.topic_category',
                    )}
                    onBlur={handleBlur('psychologist_profile.topic_category')}
                    value={values.psychologist_profile.topic_category}
                    autoCapitalize="none"
                    style={styles.InputText}
                    id="topic_category"
                    name="psychologist_profile.topic_category"
                    placeholder="Mohon masukkan kategori anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <FormControl w={'100%'} mt={1}>
                  <FormControl.Label>Spesialis</FormControl.Label>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    onChangeText={handleChange(
                      'psychologist_profile.specialization',
                    )}
                    onBlur={handleBlur('psychologist_profile.specialization')}
                    value={values.psychologist_profile.specialization}
                    autoCapitalize="none"
                    style={styles.InputText}
                    id="specialization"
                    name="psychologist_profile.specialization"
                    placeholder="Mohon masukkan spesialis anda"
                    placeholderTextColor="grey"
                    keyboardType="default"
                  />
                </FormControl>
                <Box alignItems="center" mt={2} w="full">
                  <Button w={'full'} onPress={() => alert('hello world')}>
                    SIMPAN
                  </Button>
                </Box>
              </>
            )}
          </Formik>
        </>
      )}
    </MainLayout>
  );
};

export default DetailProfil;

const styles = StyleSheet.create({
  pictureText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'red',
  },
});
