import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL} from '../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utils';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native';

export default function Detail({route}) {
  const [refreshing, setRefreshing] = useState(false)
  const [item, setItem] = useState([]);
  const [tabBarActive, setTabBarActive] = useState(1);
  const [listPelayanan, setListPelayanan] = useState([]);
  const [listAntrean, setListAntrean] = useState([]);
  const {setItem: setItemNama, getItem} = useAsyncStorage('nama')
  const [nama, setNama] = useState('')

  useEffect(() => {
    getNama()
    addVisit()
    getServices();
    getQueues();
    setItem(route.params.item);
  }, []);

  const getNama = async () => {
    const item = await getItem()
    setNama(item ? item : '')
  }

  const getQueues = async () => {
    setRefreshing(true)
    try {
      let params = {
        id_usaha: route.params.item.id_usaha,
      };

      let formData = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      let response = await axios.post(
        BASE_URL + 'user/service.php?op=getwherequeue',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log(response.data, formData);

      let {success, data} = response.data;

      if (success) {
        setListAntrean(data);
      }
      setRefreshing(false)

    } catch (error) {
      console.log('ERROR FETCH SERVICES : ', error);
      setRefreshing(false)
    }
  };

  const getServices = async () => {
    setRefreshing(true)
    try {
      let params = {
        id_usaha: route.params.item.id_usaha,
      };

      let formData = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      let response = await axios.post(
        BASE_URL + 'user/service.php?op=getwhereusaha',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log(response.data, formData);

      let {success, data} = response.data;

      if (success) {
        setListPelayanan(data);
      }
      setRefreshing(false)
    } catch (error) {
      console.log('ERROR FETCH SERVICES : ', error);
      setRefreshing(false)
    }
  };

  const addOrder = async (id_pelayanan) => {
    console.log(route.params.item);
    let params = {
      id_usaha: route.params.item.id_usaha,
      id_pelayanan: id_pelayanan,
      id_user: await AsyncStorage.getItem('id_user'),
    };

    let formData = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    try {
      let response = await axios.post(
        BASE_URL + 'api.php?op=addorder',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log(response.data);
      let {success, message} = response.data;

      alert(message);
    } catch (error) {
      console.log(error);
    }
  };

  const addVisit = async () => {
    console.log(route.params.item);
    let params = {
      id_usaha: route.params.item.id_usaha,
      id_user: await AsyncStorage.getItem('id_user'),
    };

    let formData = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    try {
      let response = await axios.post(
        BASE_URL + 'api.php?op=addvisit',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log("VISITOR :",response.data);
      let {success, message} = response.data;

    } catch (error) {
      console.log(error);
    }
  };

  const pesanPelayanan = (item) =>
    Alert.alert('', 'Ingin memesan layanan ini', [
      {
        text: 'Tidak',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => addOrder(item.id_pelayanan),
      },
    ]);

  const TabBar = (props) => {
    return (
      <View>
        <View style={styles.wrapperTabBar}>
          <TouchableOpacity
            onPress={() => setTabBarActive(1)}
            activeOpacity={0.8}
            style={[
              styles.tabBarContent,
              tabBarActive == 1 && {backgroundColor: '#4169E1', elevation: 3},
            ]}>
            <Text
              style={[
                styles.tabBarText,
                tabBarActive != 1 && {color: 'black'},
              ]}>
              Pelayanan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTabBarActive(2)}
            activeOpacity={0.8}
            style={[
              styles.tabBarContent,
              tabBarActive == 2 && {backgroundColor: '#4169E1', elevation: 3},
            ]}>
            <Text
              style={[
                styles.tabBarText,
                tabBarActive != 2 && {color: 'black'},
              ]}>
              Antrian
            </Text>
          </TouchableOpacity>
        </View>

        {props.children}
      </View>
    );
  };

  const TabListAntrean = () => {
    return listAntrean.length != 0 ? (
      listAntrean.map((item, key) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.wrapperPelayanan}
          key={key}>
          {/* ini bisa diganti sama gambar */}
          <View style={styles.antrianContainer}>
            <Text style={styles.labelNoAntrian}>{item.no_antri}</Text>
          </View>
          {/* ini bisa diganti sama gambar */}

          <View style={styles.contentPelayanan}>
            <Text style={styles.labelHeaderPelayanan} numberOfLines={2}>
              {item.id_user ? item.nama : item.nama_pemesan}
            </Text>

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
                <Text style={styles.labelSubHeaderPesanan} numberOfLines={2}>
                  {item.nama_pelayanan}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="money-bill"
                  size={13}
                  style={{marginRight: 5}}
                  color={colors.emerald500}
                />
                <Text style={styles.labelSubHeaderPesanan} numberOfLines={3}>
                  Rp. {item.harga}
                </Text>
              </View>
            </View>
            {/* End Description */}

            <TouchableOpacity
              style={[
                styles.btnContainer,
                item.status_order == 'selesai' && {
                  backgroundColor: colors.lime300,
                },
              ]}>
              <Text style={styles.btnText} numberOfLines={3}>
                {item.status_order}
              </Text>
            </TouchableOpacity>
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
        <FontAwesome5
          name="users"
          size={90}
          color={colors.gray400}
        />
        <Text
          style={{
            paddingTop: 10,
            fontSize: 13,
            textTransform: 'uppercase',
            fontWeight: '700',
            color: colors.gray500,
          }}>
          Belum ada antrian
        </Text>
      </View>
    );
  };

  const TabListPelayanan = () => {
    return listPelayanan.length != 0 ? (
      listPelayanan.map((item, key) => (
        <TouchableOpacity
          onPress={() => nama != '' ? pesanPelayanan(item) : alert('Mohon Login Terlebih Dahulu')}
          activeOpacity={0.8}
          style={styles.wrapperPelayanan}
          key={key}>
          {/* ini bisa diganti sama gambar */}
          <Image
            source={{uri: BASE_URL + item.foto}}
            style={styles.pelayananImage}
          />
          {/* ini bisa diganti sama gambar */}

          <View style={styles.contentPelayanan}>
            <Text style={styles.labelHeaderPelayanan} numberOfLines={2}>
              {item.nama_pelayanan}
            </Text>

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
                <MaterialCommunityIcons
                  name="clock-time-four-outline"
                  size={13}
                  style={{marginRight: 5}}
                  color={colors.red500}
                />
                <Text style={styles.labelSubHeaderPesanan} numberOfLines={2}>
                  {item.estimasi_waktu + ' Menit'}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="money-bill"
                  size={13}
                  style={{marginRight: 5}}
                  color={colors.emerald500}
                />
                <Text style={styles.labelSubHeaderPesanan} numberOfLines={3}>
                  Rp. {item.harga}
                </Text>
              </View>
            </View>
            {/* End Description */}

            <Text style={styles.labelSubHeaderPelayanan} numberOfLines={3}>
              {'\t' + item.deskripsi}
            </Text>
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
        <MaterialIcons
          name="design-services"
          size={100}
          color={colors.gray400}
        />
        <Text
          style={{
            paddingTop: 10,
            fontSize: 13,
            textTransform: 'uppercase',
            fontWeight: '700',
            color: colors.gray500,
          }}>
          Belum ada pelayanan
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={() => {
              getServices()
              getQueues()
            }}
          />
        }>
        <Image
          source={{uri: BASE_URL + item.foto_profil}}
          style={styles.image}
        />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.labelHeader}>{item.nama_usaha}</Text>
          <Text style={styles.labelSubHeader}>{item.alamat}</Text>
          <TabBar>
            {tabBarActive == 1 ? <TabListPelayanan /> : <TabListAntrean />}
          </TabBar>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  labelHeader: {
    fontSize: 24,
    fontWeight: '700',
  },
  labelSubHeader: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  wrapperTabBar: {
    marginVertical: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  tabBarText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    textTransform: 'capitalize',
  },
  wrapperPelayanan: {
    marginBottom: 20,
    flex: 1,
    minHeight: 100,
    maxHeight: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 3,
  },
  pelayananImage: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 100,
    backgroundColor: 'whitesmoke',
  },
  contentPelayanan: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  labelHeaderPelayanan: {
    fontWeight: '700',
    fontSize: 16,
  },
  labelSubHeaderPelayanan: {
    marginTop: 3,
    fontWeight: '600',
    fontSize: 12,
  },
  antrianContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    maxWidth: 100,
    backgroundColor: 'whitesmoke',
  },
  labelNoAntrian: {
    fontSize: 40,
    fontWeight: '700',
    color: '#4169E1',
  },
  //
  labelSubHeaderPesanan: {
    color: colors.gray800,
    fontSize: 10,
  },
  //
  btnContainer: {
    // flex: 1,
    marginTop: 5,
    maxWidth: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue300,
    borderRadius: 25,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: '700',
    color: colors.white,
    fontSize: 13,
    textTransform: 'capitalize',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
