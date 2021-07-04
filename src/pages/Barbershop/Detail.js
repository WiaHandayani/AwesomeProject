import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { BASE_URL } from '../../config';

export default function Detail({ route }) {
  const [item, setItem] = useState([])
  const [tabBarActive, setTabBarActive] = useState(1)
  const [listPelayanan, setListPelayanan] = useState([])

  useEffect(() => {
    setItem(route.params.item)
    setListPelayanan([1, 2, 3, 4, 5, 6])
  }, [])

  
  const TabBar = (props) => {
    
    return (
      <View>
        <View style={styles.wrapperTabBar}>
          <TouchableOpacity onPress={() => setTabBarActive(1)} activeOpacity={0.8} style={[styles.tabBarContent, tabBarActive == 1 && {backgroundColor: '#4169E1', elevation: 3}]}>
            <Text style={[styles.tabBarText, tabBarActive != 1 && {color: 'black'}]}>Pelayanan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabBarActive(2)} activeOpacity={0.8} style={[styles.tabBarContent, tabBarActive == 2 && {backgroundColor: '#4169E1', elevation: 3}]}>
            <Text style={[styles.tabBarText, tabBarActive != 2 && {color: 'black'}]}>Antrian</Text>
          </TouchableOpacity>
        </View>

        {props.children}
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <Image source={{ uri: BASE_URL + 'foto_usaha/'+item.foto_profil}} style={styles.image} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.labelHeader}>{item.nama_usaha}</Text>
          <Text style={styles.labelSubHeader}>{item.alamat}</Text>
          <TabBar>
            {tabBarActive == 1 ? 
              listPelayanan.map(item => (
                <TouchableOpacity activeOpacity={0.8} style={styles.wrapperPelayanan}>
                  {/* ini bisa diganti sama gambar */}
                  <View style={styles.pelayananImage} /> 
                  {/* ini bisa diganti sama gambar */}

                  <View style={styles.contentPelayanan}>
                    <Text style={styles.labelHeaderPelayanan} numberOfLines={2}>Nama pelayanan</Text>
                    <Text style={styles.labelSubHeaderPelayanan} numberOfLines={3}>{'\t'}Keterangan pelayanan ket pelayanan ket pelayanan ket pelayanan ket pelayanan ket pelayanan</Text>
                  </View>
                </TouchableOpacity>
              )
            ) : listPelayanan.map(item => (
              <TouchableOpacity activeOpacity={0.8} style={styles.wrapperPelayanan}>
                {/* ini bisa diganti sama gambar */}
                <View style={styles.antrianContainer}>
                  <Text style={styles.labelNoAntrian}>{"0"+item}</Text>
                </View>
                {/* ini bisa diganti sama gambar */}

                <View style={styles.contentPelayanan}>
                  <Text style={styles.labelHeaderPelayanan} numberOfLines={2}>Nama user</Text>
                  <Text style={styles.labelSubHeaderPelayanan} numberOfLines={3}>{'\t'}Keterangan bebas bebas ket bebas bebas ket bebas bebas ket bebas bebas ket bebas bebas ket bebas bebas</Text>
                </View>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: 18, paddingVertical: 12
  },
  labelHeader: {
    fontSize: 24,
    fontWeight: '700'
  },
  labelSubHeader: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600'
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
    marginHorizontal: 20
  },
  tabBarText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    textTransform: 'capitalize'
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
    paddingVertical: 10,
  },
  labelHeaderPelayanan: {
    fontWeight: '700',
    fontSize: 16,
  },
  labelSubHeaderPelayanan: {
    fontWeight: '600',
    fontSize: 13,
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
    color: '#4169E1' 
  }
});
