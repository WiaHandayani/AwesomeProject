import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Animated, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {colors} from '../../utils';
import RNLocation from 'react-native-location';
import {Image} from 'react-native';
import {BASE_URL, GMAPS_API} from '../../config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ScrollView} from 'react-native';

RNLocation.configure({
  distanceFilter: 5.0,
});

export default function Detail({route}) {
  const {item} = route.params;

  /** ============ */
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [marker, setMarker] = useState({
    longitude: 0,
    latitide: 0,
  });

  const [region, setRegion] = useState({
    latitudeDelta: 0.085,
    longitudeDelta: 0.0821,
  });
  /** ============*/

  const permissionHandle = async () => {
    // console.log('here', this.props.route);
    let permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });

    let location;

    if (!permission) {
      permissionHandle();
    } else {
      location = await RNLocation.getLatestLocation({timeout: 100});
      await setCoordinates({
        longitude: location.longitude,
        latitude: location.latitude,
      });
      await setRegion((prevState) => ({
        ...prevState,
        ...{
          longitude: location.latitude,
          latitude: location.longitude,
        },
      }));

      if (item.longLat) {
        setMarker({
          latitude: parseFloat(item.longLat.split(', ')[1]),
          longitude: parseFloat(item.longLat.split(', ')[0]),
        });
      } else {
        setMarker();
      }

      // alert(JSON.stringify(region));
    }
  };

  useEffect(() => {
    permissionHandle();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      {region.hasOwnProperty('latitude') && (
        <MapView
          style={{width: '100%', height: Dimensions.get('screen').height / 2.3}}
          region={{
            ...coordinates,
            longitudeDelta: 0.08,
            latitudeDelta: 0.08,
          }}>
          <MapView.Marker coordinate={marker} onPress={(e) => null}>
            <Animated.View style={[styles.markerWrap]}>
              <Animated.Image
                source={require('../../assets/map_marker.png')}
                style={styles.marker}
                resizeMode="cover"
              />
            </Animated.View>
          </MapView.Marker>
          <MapView.Marker coordinate={coordinates}>
            <View style={styles.circle}>
              <Text style={styles.pinText}> </Text>
            </View>
          </MapView.Marker>

          <MapViewDirections
            origin={coordinates}
            destination={marker}
            apikey={GMAPS_API}
            strokeColor={'blue'}
            strokeWidth={5}
          />
        </MapView>
      )}

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: 22,
          paddingVertical: 18,
        }}>
        {/* Usaha */}
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: BASE_URL + item.foto_profil}}
            resizeMode="cover"
            style={{height: 100, width: 100, borderRadius: 6}}
          />
          <View style={{flex: 1, paddingVertical: 8, paddingLeft: 10}}>
            <Text numberOfLines={2} style={{fontSize: 17, fontWeight: '700'}}>
              {item.nama_usaha}
            </Text>
            <View
              style={{
                paddingTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Fontisto name="map-marker-alt" size={14} color={colors.red500} />
              <Text
                numberOfLines={4}
                style={{fontSize: 13, fontWeight: '600', marginLeft: 5}}>
                {item.alamat}
              </Text>
            </View>
          </View>
        </View>
        {/* ENd Usaha */}

        <View
          style={{
            height: 1,
            backgroundColor: colors.gray100,
            marginVertical: 15,
          }}
        />

        {/* Pelayanan  */}
        <View style={{flex: 1}}>
          <Image
            source={{uri: BASE_URL + item.foto}}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              alignSelf: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.gray100,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderBottomWidth: 1,
              borderColor: colors.gray200,
              paddingVertical: 7,
            }}>
            <View style={{flexDirection: 'row', flex: 1, maxWidth: Dimensions.get('screen').width / 2.3 }}>
              <Text>Nama Pelayanan </Text>
            </View>
            <Text>: </Text>
            <Text>{item.nama_pelayanan}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderBottomWidth: 1,
              borderColor: colors.gray200,
              paddingVertical: 7,
            }}>
            <View style={{flexDirection: 'row', flex: 1, maxWidth: Dimensions.get('screen').width / 2.3 }}>
              <Text>Harga </Text>
            </View>
            <Text>: </Text>
            <Text>{'Rp'+item.harga}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderBottomWidth: 1,
              borderColor: colors.gray200,
              paddingVertical: 7,
            }}>
            <View style={{flexDirection: 'row', flex: 1, maxWidth: Dimensions.get('screen').width / 2.3 }}>
              <Text>No. Antrian </Text>
            </View>
            <Text>: </Text>
            <Text>{item.no_antri}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderBottomWidth: 1,
              borderColor: colors.gray200,
              paddingVertical: 7,
            }}>
            <View style={{flexDirection: 'row', flex: 1, maxWidth: Dimensions.get('screen').width / 2.3 }}>
              <Text>Tanggal Order </Text>
            </View>
            <Text>: </Text>
            <Text>{item.tgl_order}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderBottomWidth: 1,
              borderColor: colors.gray200,
              paddingVertical: 7,
            }}>
            <View style={{flexDirection: 'row', flex: 1, maxWidth: Dimensions.get('screen').width / 2.3 }}>
              <Text>Estimasi Waktu</Text>
            </View>
            <Text>: </Text>
            <Text>{item.estimasi_waktu+ ' Menit'}</Text>
          </View>
        </View>
        {/* End Pelayanan  */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'blue',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
