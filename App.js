import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, LogBox } from 'react-native';

import AuthenNavigator from './navigation/Navigator'

export default function App() {
  LogBox.ignoreLogs(['Setting a timer',"Can't perform a React state update on an unmounted component"]);
  return (
      <AuthenNavigator/>
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
