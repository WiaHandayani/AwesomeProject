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

import { Aktivitas, HomeIcon, riwayat, User, cari, chevron, kembali } from '../../assets';
import { ListItem, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../config';

const help = ({navigation}) => {
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
        <Text style={styles.text_header}>GetHaircut Application - FAQ</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Question1')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Kenapa harus menggunakan aplikasi get haircut?</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
        }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question2')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara memesan di get haircut</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question3')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Barberman membatalkan pesanan</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question4')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Tidak dapat melakukan pemesanan</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question5')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Barberman meminta pembayaran lebih dari yang tertera diaplikasi</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question6')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Barberman kurang sopan</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question7')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara mendapatkan struk pemesanan</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question8')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara membatalkan pesanan saya</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question9')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Salon/Barbershop yang dicari tidak ada</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question10')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara mengganti alamat saya</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question11')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Kualitas pelayanan yang saya terima kurang baik</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question12')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara mengubah profil saya</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question13')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara melihat riwayat pemesanan saya</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Question14')}>
      <View>
        {
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Cara mencari salon/barbershop yang saya mau</ListItem.Title>
            </ListItem.Content>
            <Image style={{height:30, width:30}} source={chevron}/>
          </ListItem>
         }
      </View>
      </TouchableOpacity>
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
    </View>
    
  );
};

export default help;

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
  }
});
