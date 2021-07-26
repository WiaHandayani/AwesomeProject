import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {findNearest} from 'geolib';
import {BASE_URL} from '../../config';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function RouteMapShop({navigation, route}) {
  let {details, data} = route.params;

  let coordinates = {
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng,
  };

  const [region, setRegion] = useState({
    ...coordinates,
    latitudeDelta: 0.085,
    longitudeDelta: 0.0821,
  });
  const [closest, setClosest] = useState([]);
  const [markers, setMarkers] = useState([]);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const getBarber = async () => {
    try {
      let response = await axios.get(BASE_URL + 'api.php?op=list-barber');
      let {data, success} = response.data;

      if (success) {
        if (data.length !== 0) {
          let wadah = [],
            longLat = [];
          data.forEach((item) => {
            longLat.push({
              latitude: parseFloat(item.longLat.split(',')[1]),
              longitude: parseFloat(item.longLat.split(',')[0]),
            });

            wadah.push({
              ...{item},
              coordinate: {
                latitude: parseFloat(item.longLat.split(',')[1]),
                longitude: parseFloat(item.longLat.split(',')[0]),
              },
              image: BASE_URL + item.foto_profil,
              title: item.nama_usaha,
              description: item.alamat,
              reviews: 0,
            });
          });

          setMarkers(wadah);
          setClosest(
            findNearest(
              {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              },
              longLat,
            ),
          );
        }
      }
    } catch (error) {
      alert(1);
      console.log('ERRORR :', error);
    }
  };

  useEffect(() => {
    getBarber();
  }, []);

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    setClosest(mapEventData.nativeEvent.coordinate)

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={_map}
        style={{...StyleSheet.absoluteFillObject}}
        region={region}>
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
        <MapView.Marker coordinate={coordinates}>
          <View style={styles.circle}>
            <Text style={styles.pinText}> </Text>
          </View>
        </MapView.Marker>
        {closest.hasOwnProperty('latitude') && (
          <MapViewDirections
            origin={coordinates}
            destination={closest}
            apikey="AIzaSyAMwBbUtpCZDsC0DmEn0eYTuVnhOUIXkVc"
            strokeColor={'blue'}
            strokeWidth={5}
          />
        )}
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{uri: marker.image}}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailBarbershop', {item: marker.item})}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#FF6347',
                      borderWidth: 1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#FF6347',
                      },
                    ]}>
                    Pesan sekarang
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
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
  button: {
    alignItems: 'center',
    marginTop: 5
  },
});
