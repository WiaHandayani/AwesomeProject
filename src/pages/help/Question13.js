import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';

import { Aktivitas, HomeIcon, riwayat, User, cari, kembali, tlp, Inbox, alamatUser } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../config';

const Question13 = ({navigation}) => {
  const [foto_profil, setfoto_profil] = useState('');
  useEffect(() => {
    async function funGetAsyncStorage() {
      let _fotoprofil = await AsyncStorage.getItem('foto_profil');
  
      setfoto_profil(_fotoprofil);
    }

    funGetAsyncStorage()
  }, []);
return (
    <View style={{flex:1}}>
        <ScrollView>
            <StatusBar backgroundColor='#4169E1' barStyle="light-content"/> 
            <View style={{backgroundColor:'#4169E1', height:75}}>
                <View style={{left:15, marginTop:25, flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('help')} >
                        <Image style={{height:25, width:25}} source={kembali}/>
                    </TouchableOpacity>
                    <Text style={styles.text_header}>GetHaircut Application</Text>
                </View>
            </View>
            <View style={styles.textPrivate}>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Cara melihat riwayat pemesanan </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}saya</Text>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {" "}Masuk ke menu 'Riwayat'
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}(setelah login) maka akan tampil
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}riwayat pemesanan Anda.
                </Text>
             </View>
             <View style={styles.textPrivate2}>
                <Text style={[styles.color_textPrivate2, {fontWeight: 'bold'}]}>{" "}Informasi lebih lanjut:</Text>
             </View>
             <View style={{height:12}}/>
             <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Image style={{height:20, width:20}} source={alamatUser}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>Jalan Nyi Mas Endang Geulis Danawinangun, Klangenan - Kabupaten Cirebon</Text>
                </View>
                <View style={styles.row}>
                    <Image style={{height:20, width:20}} source={tlp}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>(+62) 82118 108732</Text>
                </View>
                <View style={styles.row}>
                    <Image style={{height:20, width:20}} source={Inbox}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>gethaircutapplication@gmail.com</Text>
                </View>
            </View>
        </ScrollView>
   
      <View style={{}}>
        
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
                    <Text style={{fontSize:12, color:'#545454', marginTop:4}}>Cari</Text>
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
                <Image style={{height:26, width:26}} source={{uri: BASE_URL+foto_profil}}/>
                <Text style={{fontSize:12, color:'#545454', marginTop:4}}>Akun</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
    </View>
    
  );
};

export default Question13;

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
        fontSize: 18,
        left: 20,
        marginTop:0
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 40,
        marginLeft: 20,
        marginRight:20
    },
    color_textPrivate: {
        color: 'grey',
        fontSize:28
    },
    textPrivate2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 100,
        marginLeft: 22,
        marginRight:20
    },
    color_textPrivate2: {
        color: 'grey',
        fontSize:22
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    }
});
