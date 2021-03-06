import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput
} from 'react-native';

import StarRating from '../../components/StarRating';
import { colors } from '../../utils';
import { Aktivitas, HomeIcon, riwayat, User, cari, Search } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../config';

const AktivitasScreen = ({navigation}) => {

    const [foto_profil, setfoto_profil] = useState('');
    useEffect(async () => {
      let _fotoprofil = await AsyncStorage.getItem('foto_profil');
  
      setfoto_profil(_fotoprofil);
    }, []);

return (  
   
      <View style={{flex:1}}>
          <ScrollView>
          <StatusBar backgroundColor='#4169E1' barStyle="light-content"/> 
          <View style={{flex:1, backgroundColor:'white'}}>
            <View style={{backgroundColor:'#4169E1',height:70}}>
            <Text style={styles.text_header}>GetHaircut Application - Riwayat</Text>
            </View>
      <View style={styles.cardsWrapper}>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../../assets/icon/food-banner2.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Food Place</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
        </TouchableOpacity>
      </View> 
      </View>
          </ScrollView>
        
        <View style={{height:54, flexDirection:'row'}}>
            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                    <Image source={HomeIcon} style={{height:26, width:35}}/>
                    <Text style={{fontSize:12, color:'#545454', color:'#545454', marginTop:4}}>Beranda</Text>
                    </TouchableOpacity>
            </View>
            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('AktivitasScreen')} >
                    <Image style={{height:26, width:26}} source={Aktivitas}/>
                    <Text style={{fontSize:12, color:'#545454', marginTop:4}}>Aktivitas</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Cari')} >
                    <Image style={{height:28, width:28}} source={cari}/>
                    <Text style={{fontSize:12, color:colors.default, marginTop:4}}>Cari</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Riwayat')} >
                <Image style={{height:26, width:26}} source={riwayat}/>
                <Text style={{fontSize:12, color:'#545454', marginTop:4}}>Riwayat</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
              {foto_profil != null ? (
                <Image style={{height:26, width:26}} source={{uri: BASE_URL+foto_profil}}/>
              ) : null}

            {foto_profil == null ? (
                <Image style={{height:26, width:26}} source={User}/>
              ) : null}
                <Text style={{fontSize:12, color:'#545454', marginTop:4}}>Akun</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
    
  );
};

export default AktivitasScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    left: 25,
    marginTop:25
  },
  cardsWrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    height: 200,
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#4169E1'
  },
  cardDetails: {
    fontSize: 12,
    color: '#4169E1',
  },
});
