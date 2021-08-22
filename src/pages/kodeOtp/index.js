import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../config';
import {colors} from '../../utils';

const kodeOtp = ({navigation, route}) => {
  const [form, setForm] = useState({
    otp: '',
  });

  const sendData = () => {
    if (form.otp == '') {
      return alert('Kode OTP harus diisi');
    } else {
      var urlAksi = BASE_URL + 'api.php?op=cek_otp';

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'otp=' + form.otp + '&email=' + route.params.email,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson[0] == 'Registrasi Berhasil') {
            alert(responseJson[0]);
            navigation.navigate('inputRegistrasi', {email: responseJson[1]});
          } else {
            alert(responseJson[0]);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const onInputChange = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Kode OTP</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.color_textPrivate}>
            Silahkan masukkan kode otp yang telah dikirim ke alamat e-mail anda!
          </Text>
          <View style={{height: 48}} />
          <Text style={styles.text_footer}>Kode OTP</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Masukkan Kode OTP Anda"
              style={styles.textInput}
              autoCapitalize="none"
              value={form.otp}
              onChangeText={(value) => onInputChange(value, 'otp')}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={sendData}>
              <LinearGradient
                colors={['#4169E1', '#4169E1']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Kirim
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default kodeOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.default,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
