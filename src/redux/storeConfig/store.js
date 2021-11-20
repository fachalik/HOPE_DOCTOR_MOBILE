import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';
import rootReducer from '../reducer/rootReducer';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// init middleware
const middleware = [thunk, createDebounce()];

//Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistenceConfigs = {
  key: 'reducer', //whatever you want to keep as the key
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistenceConfigs, rootReducer);

// create Store
const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware)),
);

//persistor
const persistedStore = persistStore(store);

export {store, persistedStore};
