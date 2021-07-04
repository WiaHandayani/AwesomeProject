import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Search} from '../../assets'

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
          <MapView style={styles.map} initialRegion={{
              latitude: -6.7426871,
              longitude: 108.4839975,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009
          }}>
              <Marker coordinate={{latitude: -6.717543030045294, longitude: 108.54974402223873}}/>
          </MapView>
          <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper:{
        ...StyleSheet.absoluteFillObject
    },
    map:{
        ...StyleSheet.absoluteFillObject
    }
})

export default Maps;
