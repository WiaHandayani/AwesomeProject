import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import Router from './router';

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
