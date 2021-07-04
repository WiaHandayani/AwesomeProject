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
import { BASE_URL } from '../../config';

const KetentuanLayanan = ({navigation}) => {
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
        <Text style={styles.text_header}>GetHaircut Application - Ketentuan Layanan</Text>
        </View>
      </View>
      <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {" "}Dengan mengunduh, memasang, dan/atau menggunakan 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}Aplikasi Get Haircut ("Aplikasi"), Anda setuju bahwa Anda telah
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}membaca, memahami dan menerima dan menyetujui Ketentuan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}Penggunaan ini ("Ketentuan Penggunaan"). Ketentuan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}Penggunaan ini merupakan suatu perjanjian sah antara Anda
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}dan PT Get Haircut Cirebon dan Layanan dan Aplikasi
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}(sebagaimana didefinisikan di bawah ini). Kebijakan Privasi
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}ini berlaku bagi seluruh pengguna aplikasi, layanan, atau produk
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}(“Aplikasi”) kami, kecuali diatur padakebijakan privasi yang
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}terpisah.
                </Text>
             </View>
             <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {" "}Silahkan membatalkan akun Anda (jika Anda telah mendaftar
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}untuk Aplikasi) dan secara permanen menghapus aplikasi dari
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}perangkat Anda jika Anda tidak setuju atau tidak ingin 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}masuk ke dalam Ketentuan Penggunaan.
                </Text>
             </View>
             <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {" "}MOHON ANDA MEMERIKSA KETENTUAN PENGGUNAAN DAN
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}KEBIJAKAN PRIVASI KAMI DENGAN SEKSAMA SEBELUM 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}MENGUNDUH APLIKASI ATAU MENGGUNAKAN LAYANAN KAMI
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}UNTUK PERTAMA KALI.
                </Text>
             </View>
             <View style={styles.textPrivate3}>
                <Text style={styles.color_textPrivate}>
                    {" "}1. PT Get Haircut Cirebon adalah suatu perseroan yang
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    didirikan berdasarkan hukum Negara Republik Indonesia
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    ("kami" atau "milik kami").
                </Text>
             </View>
             <View style={styles.textPrivate3}>
                <Text style={styles.color_textPrivate}>
                    {" "}2. Aplikasi ini merupakan aplikasi perangkat lunak yang
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    berfungsi sebagai sarana untuk menemukan layanan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    barbershop/salon terdekat dan kemudian melakukan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    pemesanan pada salon/barbershop tersebut.
                </Text>
             </View>
             <View style={styles.textPrivate3}>
                <Text style={styles.color_textPrivate}>
                    {" "}3. Aplikasi ini memungkinkan Anda untuk mengirimkan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    permintaan untuk suatu Layanan kepada Penyedia Layanan.
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    Penerima GPS - yang harus dipasang pada perangkat bergerak 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    (smart phone) dimana Anda telah mengunduh Aplikasi -
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    mendeteksi lokasi Anda dan mengirimkan informasi lokasi Anda
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    ke Penyedia Layanan terkait.
                </Text>
             </View>
             <View style={styles.textPrivate3}>
                <Text style={styles.color_textPrivate}>
                    {" "}4. Kami akan melakukan semua upaya wajar untuk
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    menghubungkan Anda dengan Penyedia Layanan untuk 
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    mendapatkan Layanan, tergantung kepada keberadaan
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    Penyedia Layanan di atau di sekitar lokasi Anda pada saat
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    Anda melakukan pemesanan Layanan.
                </Text>
             </View>
             <View style={styles.textPrivate3}>
                <Text style={styles.color_textPrivate}>
                    {" "}5. UNTUK MENGHINDARI KERAGU-RAGUAN, KAMI ADALAH
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    PERUSAHAAN TEKNOLOGI, BUKAN PERUSAHAAN
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    TRANSPORTASI ATAU KURIR DAN KAMI TIDAK MEMBERIKAN
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}     LAYANAN TRANSPORTASI ATAU KURIR. Kami tidak
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    mempekerjakan Penyedia Layanan dan kami tidak bertanggung
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    jawab atas setiap tindakan dan/atau kelalaian Penyedia
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}     Layanan. Aplikasi ini hanya merupakan sarana untuk
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    memudahkan pencarian atas Layanan. Adalah tergantung pada
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    Penyedia Layanan untuk menawarkan Layanan kepada Anda
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    dan tergantung pada Anda apakah Anda akan menerima
                </Text>
                <Text style={styles.color_textPrivate}>
                    {" "}    tawaran Layanan dari Penyedia Layanan.
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
                <Image style={{height:26, width:26}} source={{uri: BASE_URL+'api/uploads/'+foto_profil}}/>
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

export default KetentuanLayanan;

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
      marginTop: 70,
      marginLeft: 22,
      marginRight:20
  },
  textPrivate3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
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
