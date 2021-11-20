import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistedStore} from './redux/storeConfig/store';
import {NavigationContainer} from '@react-navigation/native';
import MainApp from './navigation/MainApp';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#FFBC0D',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <MainApp />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
