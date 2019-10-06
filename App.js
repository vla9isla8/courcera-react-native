import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComonent';
import {Provider} from "react-redux";
import configureStore from './redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';
const {persistor, store} = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<Loading/>} 
        persistor={persistor} >
        <Main/>
      </PersistGate> 
    </Provider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
