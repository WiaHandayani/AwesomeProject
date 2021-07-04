import {StackActions} from '@react-navigation/routers';
import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {logo} from './assets';
export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Auth'));
    }, 2000);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={logo} style={{marginBottom: 10}} />
        <ActivityIndicator color={'black'} />
      </View>
    );
  }
}
