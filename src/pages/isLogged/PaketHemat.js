import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BASE_URL} from '../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../utils';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RefreshControl } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function PaketHemat({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [savingPackage, setSavingPackage] = useState([]);

  useEffect(() => {
    getSavingPackage();
  }, []);

  const getSavingPackage = async () => {
    setRefreshing(true);
    try {
      let params = {
        id_user: await AsyncStorage.getItem('id_user'),
      };

      let formData = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      let response = await axios.post(
        BASE_URL + 'api.php?op=savingpackage',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log(response.data, formData);

      let {success, data} = response.data;

      if (success) {
        setSavingPackage(data);
      }
      setRefreshing(false);
    } catch (error) {
      console.log('ERROR FETCH SAVING PACKAGE : ', error);
      setRefreshing(false);
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
        onPress: async () => {
          console.log(item);
          let params = {
            id_usaha: item.id_usaha,
            id_pelayanan: item.id_pelayanan,
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
        }
      }
    ]);

  const CSavingPackage = () => {
    return savingPackage.length ? (
      savingPackage.map((item, key) => (
        <View key={key + 1}>
          <View style={styles.cardsWrapper}>
            <TouchableOpacity
              onPress={() => pesanPelayanan(item)}
              style={styles.card}
              activeOpacity={0.8}>
              <View style={styles.cardImgWrapper}>
                <Image source={{ uri: BASE_URL + item.foto }} style={styles.cardImg}>
                  {/* <Text style={styles.textNo}>{(key += 1)}</Text> */}
                </Image>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nama_pelayanan}</Text>
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
                      {item.nama_usaha}
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
                  {
                    item.deskripsi
                  }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
        }}>
        <FontAwesome5Icon name="swatchbook" size={100} color={colors.gray400} />
        <Text
          style={{
            paddingTop: 10,
            fontSize: 13,
            textTransform: 'uppercase',
            fontWeight: '700',
            color: colors.gray500,
          }}>
          Belum ada paket
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
          onRefresh={() => getSavingPackage() }
          />
        }>
        <Text style={styles.header}>Paket Hemat</Text>

        <CSavingPackage />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.gray50,
    paddingTop: 15,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.default,
    marginBottom: 20,
  },
  //
  cardsWrapper: {
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
    // elevation: 5,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#1E90FF',
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    flex: 1,
    backgroundColor: colors.default,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  textNo: {
    fontSize: 35,
    fontWeight: '700',
    color: colors.white,
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
    marginTop: 4,
    fontSize: 12,
    color: '#444',
  },
  //
  labelSubHeaderPesanan: {
    fontFamily: 'OpenSans-Regular',
    color: colors.gray800,
    fontSize: 10,
  },
  //
});
