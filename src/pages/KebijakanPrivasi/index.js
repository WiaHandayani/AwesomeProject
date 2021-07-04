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

import { Aktivitas, HomeIcon, riwayat, User, cari, kembali, alamatUser, tlp, Inbox } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage'

const KebijakanPrivasi = ({navigation}) => {
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
return (
  <View style={{flex:1}}>
    <ScrollView>
            <StatusBar backgroundColor='#4169E1' barStyle="light-content"/> 
            <View style={{backgroundColor:'#4169E1', height:75}}>
                <View style={{left:15, marginTop:25, flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                        <Image style={{height:25, width:25}} source={kembali}/>
                    </TouchableOpacity>
                    <Text style={styles.text_header}>GetHaircut Application - Kebijakan Privasi</Text>
                </View>
            </View>
            <View style={styles.textPrivate}>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Kebijakan Privasi</Text>
                <Text style={styles.color_textPrivate}>
                    {" "}berikut ini menjelaskan bagaimana kami,
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Get Haircut Application</Text>
                <Text style={styles.color_textPrivate}>
                    {" "}(PT Aplikasi Karya Mahasiswa
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}dan afiliasi-afiliasi, atau “kami”) mengumpulkan, menyimpan,
                    
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}menggunakan, mengolah, menguasai, mentransfer,
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}mengungkapkan dan melindungi Informasi Pribadi anda.
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}Kebijakan Privasi ini berlaku bagi seluruh pengguna aplikasi,
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}layanan, atau produk (“Aplikasi”) kami, kecuali diatur pada
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}kebijakan privasi yang terpisah.
                </Text>
             </View>
             <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {" "}Mohon baca Kebijakan Privasi ini dengan seksama untuk 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}memastikan bahwa anda memahami bagaimana proses 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}pengolahan data kami. Kecuali didefinisikan lain, semua istilah 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}dengan huruf kapital yang digunakan dalam Kebijakan Privasi ini 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}memiliki arti yang sama dengan yang tercantum dalam Ketentuan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}Pengunaan.
                </Text>
             </View>
             <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {" "}Kebijakan Privasi ini mencakup hal-hal sebagai berikut:
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}1. Informasi Pribadi yang kami kumpulkan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}2. Penggunaan Informasi Pribadi yang kami kumpulkan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}3. Pemberian Informasi Pribadi yang kami kumpulkan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}4. Penyimpanan Informasi Pribadi
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}5. Akses dan koreksi Informasi Pribadi
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}6. Tempat kami menyimpan Informasi Pribadi anda
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}7. Keamanan Informasi Pribadi anda
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}8. Perubahan atas Kebijakan Privasi ini
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}9. Pengakuan dan persetujuan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}10. Materi pemasaran dan promosi
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}11. Data anonim dan Platform pihak ketiga
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
              {foto_profil != null ? (
                <Image style={{height:26, width:26}} source={{uri: 'http://192.168.43.91/api/uploads/'+foto_profil}}/>
              ) : null}

            {foto_profil == null ? (
                <Image style={{height:26, width:26}} source={User}/>
              ) : null}
                <Text style={{fontSize:12, color:'#545454', marginTop:4}}>Akun</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
    </View>
    
  );
};

export default KebijakanPrivasi;

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
    marginTop: 30,
    marginLeft: 20,
    marginRight:20
  },
  color_textPrivate: {
      color: 'grey',
      fontSize:14
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
      fontSize:14
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
