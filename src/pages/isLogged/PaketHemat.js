import React, { useState } from 'react';
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

export default function PaketHemat({navigation}) {
  const [datas, setDatas] = useState([
    1, 2, 3, 4, 5
  ])

  const pesanPelayanan = () => (
    Alert.alert(
      "",
      "Ingin memesan layanan ini",
      [
        {
          text: "Tidak",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Ya", onPress: () => alert('Pesanan berhasil ditambahkan, mohon menunggu konfirmasi dari pihak penyedia layanan') }
      ]
    )
  )

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <Text style={styles.header}>Paket Hemat</Text>

        {datas.map((item, index) => (
          <View key={(index + 1)}>
            <View style={styles.cardsWrapper}>
              <TouchableOpacity onPress={pesanPelayanan} style={styles.card} activeOpacity={0.8}>
                <View style={styles.cardImgWrapper}>
                  <View style={styles.cardImg}>
                    <Text style={styles.textNo}>{index += 1}</Text>
                  </View>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{'Nama pelayanan'}</Text>
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
                        {'Nama usaha'}
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
                      <Text
                        style={styles.labelSubHeaderPesanan}
                        numberOfLines={3}>
                        Rp. {2000}
                      </Text>
                    </View>
                  </View>
                  {/* End Description */}

                  <Text style={styles.cardDetails} numberOfLines={3}>
                    {'Deskripsi layanan Deskripsi layanan Deskripsi layanan Deskripsi layanan Deskripsi layanan Deskripsi layanan Deskripsi layanan'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
