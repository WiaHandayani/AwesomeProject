import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';

import StarRating from '../../components/StarRating';
import {colors} from '../../utils';
import {Aktivitas, HomeIcon, riwayat, User, cari, Search} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

const Salon = ({navigation}) => {
  const [listdata, setlistdata] = useState([]);
  const [foto_profil, setfoto_profil] = useState('');
  useEffect(() => {
    const getfoto_profil = () => {
      AsyncStorage.getItem('foto_profil').then((foto_profil) => {
        setfoto_profil(foto_profil);
      });
    };
    getfoto_profil();
  });

  useEffect(() => {
    var urlAksi = BASE_URL+'/api.php?op=salon';

    fetch(urlAksi, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setlistdata(responseJson);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{backgroundColor: '#4169E1', height: 130}}>
          <Text style={styles.text_header}>GetHaircut Application - Salon</Text>
          <View style={{height: 4}} />
          <View
            style={{
              marginHorizontal: 17,
              flexDirection: 'row',
              paddingTop: 15,
            }}>
            <View style={{position: 'relative', flex: 1}}>
              <TextInput
                placeholder="Mau cari salon/barbershop apa?"
                style={{
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  borderRadius: 25,
                  height: 40,
                  fontSize: 13,
                  paddingLeft: 45,
                  paddingRight: 20,
                  backgroundColor: 'white',
                  marginRight: 18,
                }}
              />
              <Image
                source={Search}
                style={{
                  position: 'absolute',
                  height: 26,
                  width: 26,
                  top: 5,
                  left: 12,
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{height: 12}} />

          {listdata.map((val, index) => (
            <View style={styles.cardsWrapper} key={index}>
              <TouchableOpacity onPress={() => navigation.navigate('DetailBarbershop', {item: val})} activeOpacity={0.8}>
                <View style={styles.card}>
                  <View style={styles.cardImgWrapper}>
                    <Image
                      source={{
                        uri: BASE_URL + 'foto_usaha/' + val.foto_profil,
                      }}
                      resizeMode="cover"
                      style={styles.cardImg}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{val.nama_usaha}</Text>
                    <StarRating ratings={4} reviews={99} />

                    <Text style={styles.cardDetails} numberOfLines={3}>
                      {val.alamat}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{height: 54, flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={HomeIcon} style={{height: 26, width: 35}} />
            <Text
              style={{
                fontSize: 12,
                color: '#545454',
                color: '#545454',
                marginTop: 4,
              }}>
              Beranda
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AktivitasScreen')}>
            <Image style={{height: 26, width: 26}} source={Aktivitas} />
            <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
              Aktivitas
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Cari')}>
            <Image style={{height: 28, width: 28}} source={cari} />
            <Text style={{fontSize: 12, color: colors.default, marginTop: 4}}>
              Cari
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
            <Image style={{height: 26, width: 26}} source={riwayat} />
            <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
              Riwayat
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {foto_profil != null ? (
              <Image
                style={{height: 26, width: 26}}
                source={{uri: BASE_URL + 'api/uploads/' + foto_profil}}
              />
            ) : null}

            {foto_profil == null ? (
              <Image style={{height: 26, width: 26}} source={User} />
            ) : null}
            <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
              Akun
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Salon;

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
    marginTop: 25,
  },
  cardsWrapper: {
    width: '90%',
    marginHorizontal: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  card: {
    height: 100,
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
    borderColor: '#708090',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#4169E1',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardDetails: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});
