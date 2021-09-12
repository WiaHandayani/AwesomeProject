import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
  ScrollView,
  RefreshControl,
  LogBox,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  banner_1,
  banner_2,
  banner_3,
  cewek,
  cowok,
  love,
  mata,
  showmore,
  uang,
  Aktivitas,
  HomeIcon,
  User,
  cari,
  riwayat,
} from '../../assets';
import {Search} from '../../assets';
import StarRating from '../../components/StarRating';
import {colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, GMAPS_API} from '../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
// import RNGooglePlaces from 'react-native-google-places';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [lastVisited, setLastVisited] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getLastVisited();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [nama, setnama] = useState('');
  useEffect(() => {
    async function funGetAsyncStorage() {
      let _nama = await AsyncStorage.getItem('nama');

      setnama(_nama ? _nama : '');
    }

    funGetAsyncStorage();
  });

  const [foto_profil, setfoto_profil] = useState('');
  useEffect(() => {
    getLastVisited();
    const getfoto_profil = () => {
      AsyncStorage.getItem('foto_profil').then((foto_profil) => {
        setfoto_profil(foto_profil);
      });
    };
    getfoto_profil();
  }, []);

  const getLastVisited = async () => {
    setRefreshing(true);
    try {
      let params = {
        id_user: await AsyncStorage.getItem('id_user'),
      };

      let formData = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      let response = await axios.post(
        BASE_URL + 'api.php?op=lastvisited',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log('SUCCESS FETCH LAST VISITED');

      let {success, data} = response.data;

      if (success) {
        setLastVisited(data);
      }
      setRefreshing(false);
    } catch (error) {
      console.log('ERROR FETCH LAST VISITED : ', error);
      setRefreshing(false);
    }
  };

  const openSearchModal = () => {
    // RNGooglePlaces.openAutocompleteModal()
    //   .then((place) => {
    //     console.log(place);
    //     // place represents user's selection from the
    //     // suggestions and it is a simplified Google Place object.
    //   })
    //   .catch((error) => console.log(error.message)); // error is a Javascript Error object
  };

  const LastVisit = () => {
    return lastVisited.length ? (
      lastVisited.map((item, key) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailBarbershop', {item: item})}
          key={key}>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={{uri: BASE_URL + item.foto_profil}}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nama_usaha}</Text>
              <Text
                style={[styles.cardDetails, {marginTop: 8}]}
                numberOfLines={3}>
                {item.alamat}
              </Text>
              {/* <StarRating ratings={4} reviews={99} /> */}
            </View>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
        }}>
        <FontAwesome5Icon name="eye" size={100} color={colors.gray400} />
        <Text
          style={{
            paddingTop: 10,
            fontSize: 13,
            textTransform: 'uppercase',
            fontWeight: '700',
            color: colors.gray500,
          }}>
          Belum ada terakhir di lihat
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{backgroundColor: '#4169E1', minHeight: 130, paddingBottom: 14}}>
        <View style={{height: 8}} />
        <Text style={styles.text_header}>GetHaircut Application</Text>
        <View style={{height: 4}} />
        <Text style={styles.text_header2}>
          Hai, {nama ? nama : 'Pengunjung'}!
        </Text>
        <View
          style={{
            marginHorizontal: 17,
            flexDirection: 'row',
            paddingTop: 15,
          }}>
          {/* <TouchableOpacity style={{position: 'relative', flex: 1}}> */}
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(details.geometry.location);
              navigation.navigate('RouteMapShop', {...{data, details}});
            }}
            onFail={(error) => console.error(error)}
            fetchDetails={true}
            autoFillOnNotFound={true}
            query={{
              key: GMAPS_API,
              language: 'en',
            }}
            styles={{
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              listView: {
                zIndex: 9999,
              },
              poweredContainer: {
                position: 'absolute',
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: '#c8c7cc',
                borderTopWidth: 0.5,
              },
            }}
          />
          {/* <TextInput
              placeholder="Masukkan Alamat Anda"
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
            /> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{height: 12}} />
          <View style={styles.sliderContainer}>
            <Swiper
              autoplay
              horizontal={false}
              height={200}
              activeDotColor="#FF6347">
              <View style={styles.slide}>
                <Image
                  source={banner_1}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={banner_2}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={banner_3}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>
          <View style={{height: 12}} />
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => navigation.navigate('Barbershop')}>
              <View style={styles.categoryIcon}>
                <Image source={cowok} style={{width: 75, height: 75}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Barbershop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => navigation.navigate('Salon')}>
              <View style={styles.categoryIcon}>
                <Image source={cewek} style={{width: 75, height: 75}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Salon</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image source={love} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Terfavorit</Text>
            </TouchableOpacity> */}
          </View>
          <View style={[styles.categoryContainer, {marginTop: 10}]}>
            {nama != '' && (
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => navigation.navigate('SeringDilihat')}>
                <View style={styles.categoryIcon}>
                  <Image source={mata} style={{width: 50, height: 50}} />
                </View>
                <Text style={styles.categoryBtnTxt}>Sering Dilihat</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => navigation.navigate('PaketHemat')}>
              <View style={styles.categoryIcon}>
                <Image source={uang} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Paket Hemat</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image source={showmore} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Lihat Lainnya</Text>
            </TouchableOpacity> */}
          </View>

          <View style={{height: nama != '' ? 12 : 100}} />
          {nama != '' && (
            <View style={styles.cardsWrapper}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#333',
                }}>
                Terakhir dikunjungi
              </Text>

              <LastVisit />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={{}}>
        <View style={{height: 54, flexDirection: 'row'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image source={HomeIcon} style={{height: 26, width: 35}} />
              <Text
                style={{
                  fontSize: 12,
                  color: '#545454',
                  color: colors.default,
                  marginTop: 4,
                }}>
                Beranda
              </Text>
            </TouchableOpacity>
          </View>
          {nama != '' && (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AktivitasScreen')}>
                <Image style={{height: 26, width: 26}} source={Aktivitas} />
                <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
                  Aktivitas
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Cari')}>
              <Image style={{height: 28, width: 28}} source={cari} />
              <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
                Cari
              </Text>
            </TouchableOpacity>
          </View>
          {nama != '' && (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
                <Image style={{height: 26, width: 26}} source={riwayat} />
                <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
                  Riwayat
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(nama != '' ? 'Profile' : 'signin')
              }>
              {nama != '' ? (
                <>
                  {foto_profil != null ? (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 50,
                        resizeMode: 'cover',
                      }}
                      source={{uri: BASE_URL + foto_profil}}
                    />
                  ) : null}

                  {foto_profil == null ? (
                    <Image style={{height: 26, width: 26}} source={User} />
                  ) : null}
                </>
              ) : (
                <FontAwesome5Icon
                  name="sign-in-alt"
                  size={24}
                  color={colors.default}
                />
              )}

              <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
                {nama != '' ? 'Akun' : 'Masuk'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    left: 25,
  },
  text_header2: {
    color: '#fff',
    fontSize: 16,
    left: 25,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#6495ED',
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#4169E1',
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
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
