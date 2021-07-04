import React, { useEffect, useState } from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity,Image, ScrollView, RefreshControl, StatusBar} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage'

import Share from 'react-native-share';

import files from '../../assets/filesBase64';

import { cari, Aktivitas, alamat, edit, Help, HomeIcon, Ketentuan, privasi, riwayat, share, tentang, tgllahir, tlp, User, gantipw, alamatUser} from '../../assets';
import { colors } from '../../utils';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Profile = ({navigation}) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [value, setvalue] = useState('');
    useEffect(() =>{
        const getValue = () => {
            AsyncStorage.getItem('nama')
            .then((value) => {
                setvalue(value);
            }) 
        }
        getValue()
    })

    const [email, setemail] = useState('');
    useEffect(() =>{
        const getemail = () => {
            AsyncStorage.getItem('email')
            .then((email) => {
                setemail(email);
            }) 
        }
        getemail()
    })

    const [no_hp, setno_hp] = useState('');
    useEffect(() =>{
        const getno_hp = () => {
            AsyncStorage.getItem('no_hp')
            .then((no_hp) => {
                setno_hp(no_hp);
            }) 
        }
        getno_hp()
    })

    const [id_user, setid_user] = useState('');
    useEffect(() =>{
        const getid_user = () => {
            AsyncStorage.getItem('id_user')
            .then((id_user) => {
                setid_user(id_user);
            }) 
        }
        getid_user()
    })

    const [foto_profil, setfoto_profil] = useState('');
    useEffect(() =>{
        const getfoto_profil = () => {
            AsyncStorage.getItem('foto_profil')
            .then((foto_profil) => {
                setfoto_profil(foto_profil);
            }) 
        }
        getfoto_profil()
    })

    const [alamat, setalamat] = useState('');
    useEffect(() =>{
        const getalamat = () => {
            AsyncStorage.getItem('alamat')
            .then((alamat) => {
                setalamat(alamat);
            }) 
        }
        getalamat()
    })

    const [tgl_lahir, setgl_lahir] = useState('');
    useEffect(() =>{
        const getgl_lahir = () => {
            AsyncStorage.getItem('tgl_lahir')
            .then((tgl_lahir) => {
                setgl_lahir(tgl_lahir);
            }) 
        }
        getgl_lahir()
    })

  const myCustomShare = async() => {
    const shareOptions = {
      message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
      url: files.appLogo,
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };

  const _logout = async () => {
    await AsyncStorage.clear()
    //AsyncStorage.getAllKeys().then(data => console.log(data))
    navigation.navigate('Splash')
}

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
      <StatusBar backgroundColor='#4169E1' barStyle="light-content"/> 
      <View style={{backgroundColor:'#4169E1',height:40}}>
      <View style={{height:8}}/>
      <Text style={styles.text_header}>GetHaircut Application - Akun Saya</Text>
      </View>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
        {foto_profil != null ? (
                 <Avatar.Image 
                 source={{
                   uri: 'http://192.168.43.91/api/uploads/'+foto_profil,
                 }}
                 size={80}
               />
              ) : null}

      {foto_profil == null ? (
                <Image style={{ width:80, height:80}} source={User}/>
      ) : null}
         
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{value}</Title>
            <Caption style={styles.caption}>{email}</Caption>
            <View style={{right:-100, top:-10, position:'absolute'}}>
            <TouchableOpacity  onPress={() => navigation.navigate("Edit_Profile",  {id_user: id_user, nama: value, email: email, no_hp: no_hp, foto_profil:foto_profil, alamat: alamat, tgl_lahir: tgl_lahir})}>
            <Image style={{height:30, width:30}} source={edit}/>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Image style={{height:20, width:20}} source={alamatUser}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{alamat}</Text>
        </View>
        <View style={styles.row}>
          <Image style={{height:20, width:20}} source={tlp}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{no_hp}</Text>
        </View>
        <View style={styles.row}>
          <Image style={{height:20, width:20}} source={tgllahir}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{tgl_lahir}</Text>
        </View>
      </View>

      

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <TouchableOpacity style={{alignItems:'center'}}>
              <Title>2</Title>
              <Caption>Pesanan 1 bulan terakhir</Caption>
            </TouchableOpacity>
          </View>
          <View style={styles.infoBox}>
          <TouchableOpacity style={{alignItems:'center'}}>
            <Title>15</Title>
            <Caption>Orderan 6 bulan terakhir</Caption>
          </TouchableOpacity>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('GantiPw')}>
          <View style={styles.menuItem}>
            <Image style={{height:25, width:25}} source={gantipw}/>
            <Text style={styles.menuItemText}>Ganti Kata Sandi</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('TentangApk')}>
          <View style={styles.menuItem}>
            <Image style={{height:25, width:25}} source={tentang}/>
            <Text style={styles.menuItemText}>Tentang Aplikasi</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('KetentuanLayanan')}>
          <View style={styles.menuItem}>
            <Image style={{height:25, width:25}} source={Ketentuan}/>
            <Text style={styles.menuItemText}>Ketentuan Layanan</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('KebijakanPrivasi')}>
          <View style={styles.menuItem}>
            <Image style={{height:25, width:25}} source={privasi}/>
            <Text style={styles.menuItemText}>Kebijakan Privasi</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('help')}>
          <View style={styles.menuItem}>
            <Image style={{height:25, width:25}} source={Help}/>
            <Text style={styles.menuItemText}>Bantuan</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Image style={{height:25, width:25}} source={share}/>
            <Text style={styles.menuItemText}>Bagikan ke Teman</Text>
          </View>
        </TouchableRipple>
        <View style={{height:18}}/>
        <TouchableOpacity
                    onPress={_logout}
                    style={[styles.signIn, {
                        borderColor: '#FF0000',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FF0000'
                    }]}>Keluar</Text>
                </TouchableOpacity>
      </View>
      </ScrollView>

      <View>
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
              {foto_profil != null ? (
                <Image style={{height:26, width:26}} source={{uri: 'http://192.168.43.91/api/uploads/'+foto_profil}}/>
              ) : null}

            {foto_profil == null ? (
                <Image style={{height:26, width:26}} source={User}/>
              ) : null}
                <Text style={{fontSize:12, color:colors.default, marginTop:4}}>Akun</Text>
              </TouchableOpacity>
            </View>
      </View>
      </View>
    </SafeAreaView>
    
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    left: 25
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
