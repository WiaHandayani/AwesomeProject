import React, {useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';

const Auth = ({navigation}) => {
  useEffect(() => {
    const isLogin = () => {
      navigation.replace('Home');
      AsyncStorage.getItem('nama').then((data) => {
        // alert(data)
      });
    };

    isLogin();
  }, []);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Auth;
