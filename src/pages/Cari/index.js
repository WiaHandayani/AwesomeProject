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
  FlatList,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utils';
import {Aktivitas, HomeIcon, riwayat, User, cari, Search} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

const Cari = ({navigation}) => {
  const [foto_profil, setfoto_profil] = useState('');
  const [nama_usaha, setnama_usaha] = useState('');
  const [listdata, setlistdata] = useState([]);
  const [newlistdata, setnewlistdata] = useState([]);
  useEffect(() => {
    async function funFotoProfile() {
      let _fotoprofil = await AsyncStorage.getItem('foto_profil');
  
      setfoto_profil(_fotoprofil);
    }

    funFotoProfile()
  }, []);

  useEffect(() => {
    var urlAksi = BASE_URL + 'api.php?op=cari_salonbarber';

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
  }, []);

  function CariData(value) {
    var urlAksi = BASE_URL + 'api.php?op=cari';

    fetch(urlAksi, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'nama_usaha=' + value,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setlistdata([]);
        setlistdata(responseJson);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{backgroundColor: '#4169E1', height: 130}}>
              <Text style={styles.text_header}>
                GetHaircut Application - Pencarian
              </Text>
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
                    onChangeText={(value) => CariData(value)}
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
          </View>

          <View style={{height: 12}} />

          {listdata.length > 0 ? (
            <FlatList
              data={listdata}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <View style={styles.cardsWrapper}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate('DetailBarbershop', {item: item})
                    }
                    activeOpacity={0.8}>
                    <View style={styles.cardImgWrapper}>
                      <Image
                        source={{
                          uri: BASE_URL + item.foto_profil,
                        }}
                        resizeMode="cover"
                        style={styles.cardImg}
                      />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{item.nama_usaha}</Text>
                      {/* <StarRating ratings={4} reviews={99} /> */}
                      <View style={{height: 8}} />

                      <Text style={styles.cardDetails} numberOfLines={3}>
                        {item.alamat}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 30,
              }}>
              <MaterialIcons
                name="search"
                size={70}
                color={colors.gray500}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.gray500,
                  textTransform: 'uppercase',
                  fontWeight: '700',
                }}>
                Belum ada barbershop/salon
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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
                source={{uri: BASE_URL + foto_profil}}
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

export default Cari;

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
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#1E90FF',
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    // padding: 10,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
