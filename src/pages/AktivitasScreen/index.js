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

import axios from 'axios';
import {colors} from '../../utils';
import {Aktivitas, HomeIcon, riwayat, User, cari, Search} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';
import { RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const AktivitasScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [foto_profil, setfoto_profil] = useState('');
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    setRefreshing(true);
    try {
      let params = {
        id_user: await AsyncStorage.getItem('id_user'),
      };

      let formData = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      let response = await axios.post(
        BASE_URL + 'api.php?op=activity_order',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log(response.data, formData);

      let {success, data} = response.data;

      if (success) {
        setActivity(data);
      }
      setRefreshing(false);
    } catch (error) {
      console.log('ERROR FETCH SAVING PACKAGE : ', error);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    const getfoto_profil = () => {
      AsyncStorage.getItem('foto_profil').then((foto_profil) => {
        setfoto_profil(foto_profil);
      });
    };
    getfoto_profil();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white }}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
          refreshing={refreshing}
          onRefresh={() => getActivity()}
          />
        }>
        <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{backgroundColor: '#4169E1', height: 70}}>
            <Text style={styles.text_header}>
              GetHaircut Application - Aktivitas
            </Text>
          </View>
          <View style={{height: 12}} />

          {/* Card */}
          {activity.map((item, key) => (
            <View key={key + 1}>
              <View style={styles.cardsWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailAktivitas', {item: item})}
                  style={styles.card}
                  activeOpacity={0.8}>
                  <View style={styles.cardImgWrapper}>
                    <Image
                      source={{uri: BASE_URL + item.foto_profil}}
                      style={styles.cardImg}>
                      {/* <Text style={styles.textNo}>{(key += 1)}</Text> */}
                    </Image>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.nama_usaha}</Text>
                    {/* Description */}
                    <View
                      style={{
                        paddingTop: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          paddingRight: 18,
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <MaterialIcons
                          name="miscellaneous-services"
                          size={14}
                          style={{marginRight: 5}}
                          color={colors.lightBlue400}
                        />
                        <Text
                          style={styles.labelSubHeaderPesanan}
                          numberOfLines={2}>
                          {item.nama_pelayanan}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.8,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <FontAwesome5Icon
                          name="money-bill"
                          size={13}
                          style={{marginRight: 5}}
                          color={colors.emerald500}
                        />
                        <Text
                          style={styles.labelSubHeaderPesanan}
                          numberOfLines={3}>
                          Rp. {item.harga}
                        </Text>
                      </View>
                    </View>
                    {/* End Description */}

                    <Text style={styles.cardDetails} numberOfLines={3}>
                      {item.deskripsi}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ padding: 5, backgroundColor: colors.default }}>
                  <Text style={{ color: colors.white, textAlign: 'center', textTransform: 'uppercase', fontSize: 12, fontWeight: '700' }}>{item.status_order}</Text>
                </View>
              </View>
            </View>
          ))}
          {/* ENd Card */}
        </View>
      </ScrollView>

      <View style={{height: 54, flexDirection: 'row', backgroundColor: colors.gray100}}>
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
    marginTop: 25,
  },
  cardsWrapper: {
    flex: 1,
    paddingHorizontal: 13,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    // marginVertical: 5,
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
    // borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#4169E1',
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#4169E1',
  },
  cardDetails: {
    fontSize: 12,
    color: '#4169E1',
  },
});
