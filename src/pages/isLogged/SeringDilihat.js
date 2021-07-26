import React, { useEffect, useState } from 'react';
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
import { Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SeringDilihat({navigation}) {
  const [refreshing, setRefreshing] = useState(false)
  const [seenOf, setSeenOf] = useState([])

  useEffect(() => {
    getSeenOften()
  }, [])

  const getSeenOften = async () => {
    setRefreshing(true);
    try {
      let params = {
        id_user: await AsyncStorage.getItem('id_user'),
      };

      let formData = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      let response = await axios.post(
        BASE_URL + 'api.php?op=seenoften',
        formData,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );

      console.log(response.data, formData);

      let {success, data} = response.data;

      if (success) {
        setSeenOf(data);
      }
      setRefreshing(false);
    } catch (error) {
      console.log('ERROR FETCH SEEN OFTEN : ', error);
      setRefreshing(false);
    }
  };

  const SeenOften = () => {
    return seenOf.length ? (
      seenOf.map((item, key) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailBarbershop', {item: item})} key={key}>
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
              <Text style={[styles.cardDetails, {marginTop: 8}]} numberOfLines={3}>{item.alamat}</Text>
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
          Belum ada sering dilihat
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
          onRefresh={() => getSeenOften() }
          />
        }>
        <Text style={styles.header}>Sering dilihat</Text>

        <SeenOften />
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
