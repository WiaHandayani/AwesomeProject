import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useEffect} from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const Auth = ({navigation}) => {

    useEffect(() => {
        const _validasiSession = async () => {
          const isLogin = await AsyncStorage.getItem('nama') 
          
          navigation.navigate(isLogin ? 'Home' : 'welcome')
        }
        _validasiSession()
      },[])

    return (
        <View>
            <ActivityIndicator/>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({})
