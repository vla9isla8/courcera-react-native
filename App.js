import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComonent';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
const store = createStore(reducers,applyMiddleware(thunk,logger));

export default function App() {
  return (
    <Provider store={store}>
      <Main/>
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
