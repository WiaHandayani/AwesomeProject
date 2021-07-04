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

const signup = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
  });

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const sendData = () => {
    if (form.email == '') {
      alert('Silakan mengisi data dengan lengkap');
    } else {
      var urlAksi = BASE_URL + 'api.php?op=create';

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=' + form.email,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson[1] == 'Silahkan cek e-mail anda!') {
            console.log(responseJson[0]);
            alert(responseJson[1]);
            navigation.navigate('kodeOtp', {email: responseJson[0]});
          } else if (responseJson == 'E-mail tidak terdaftar!') {
            console.log(responseJson[0]);
            alert(responseJson);
          } else if (responseJson == 'E-mail sudah terdaftar!') {
            console.log(responseJson[0]);
            alert(responseJson);
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
        <Text style={styles.text_header}>Daftar Sekarang!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>E-mail</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Masukkan Email Anda"
              style={styles.textInput}
              autoCapitalize="none"
              value={form.email}
              onChangeText={(value) => onInputChange(value, 'email')}
            />
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              Dengan mendaftar, Anda menyetujui
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Persyaratan Layanan
            </Text>
            <Text style={styles.color_textPrivate}> dan</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Kebijakan Privasi
            </Text>
            <Text style={styles.color_textPrivate}> kami</Text>
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
                  Daftar
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('signin')}
              style={[
                styles.signIn,
                {
                  borderColor: '#4169E1',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#4169E1',
                  },
                ]}>
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default signup;

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
