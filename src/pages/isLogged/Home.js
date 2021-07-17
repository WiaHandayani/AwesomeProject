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
import {BASE_URL} from '../../config';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import RNGooglePlaces from 'react-native-google-places';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [nama, setnama] = useState('');
  useEffect(() => {
    const getnama = () => {
      AsyncStorage.getItem('nama').then((nama) => {
        setnama(nama);
      });
    };
    getnama();
  }, []);

  const [foto_profil, setfoto_profil] = useState('');
  useEffect(() => {
    const getfoto_profil = () => {
      AsyncStorage.getItem('foto_profil').then((foto_profil) => {
        setfoto_profil(foto_profil);
      });
    };
    getfoto_profil();
  }, []);

  const openSearchModal = () => {
    // RNGooglePlaces.openAutocompleteModal()
    //   .then((place) => {
    //     console.log(place);
    //     // place represents user's selection from the
    //     // suggestions and it is a simplified Google Place object.
    //   })
    //   .catch((error) => console.log(error.message)); // error is a Javascript Error object
  };

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#4169E1', height: 130}}>
        <View style={{height: 8}} />
        <Text style={styles.text_header}>GetHaircut Application</Text>
        <View style={{height: 4}} />
        <Text style={styles.text_header2}>Hai, {nama}!</Text>
        <View
          style={{
            marginHorizontal: 17,
            flexDirection: 'row',
            paddingTop: 15,
          }}>
          <TouchableOpacity style={{position: 'relative', flex: 1}}>
            {/* <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              onFail={(error) => console.error(error)}
              fetchDetails={true}
              autoFillOnNotFound={true}
              query={{
                key: 'AIzaSyBYO8x3gZ8zBB5tN2pAHXGbuNcUcrSOpPU',
                language: 'en',
              }}
              requestUrl={{
                useOnPlatform: 'web', // or "all"
                url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
              }}
            /> */}
            <TextInput
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
            />
          </TouchableOpacity>
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
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image source={love} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Terfavorit</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.categoryContainer, {marginTop: 10}]}>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image source={mata} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Sering Dilihat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate('PaketHemat')}>
              <View style={styles.categoryIcon}>
                <Image source={uang} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Paket Hemat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image source={showmore} style={{width: 50, height: 50}} />
              </View>
              <Text style={styles.categoryBtnTxt}>Lihat Lainnya</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 12}} />
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
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Cari')}>
              <Image style={{height: 28, width: 28}} source={cari} />
              <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
                Cari
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
              <Image style={{height: 26, width: 26}} source={riwayat} />
              <Text style={{fontSize: 12, color: '#545454', marginTop: 4}}>
                Riwayat
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
