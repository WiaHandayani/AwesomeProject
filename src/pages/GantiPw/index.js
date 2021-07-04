import React, {useState, useEffect} from 'react';
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
import {colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

const GantiPw = ({navigation}) => {
  const [data, setData] = React.useState({
    confirm_secureTextEntry: true,
    secureTextEntry: true,
  });

  const [id_user, setid_user] = useState('');
  useEffect(() => {
    const getid_user = () => {
      AsyncStorage.getItem('id_user').then((id_user) => {
        setid_user(id_user);
      });
    };
    getid_user();
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const [form, setForm] = useState({
    password: '',
    konfirm_password: '',
  });

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const sendData = () => {
    if (form.password == '') {
      alert('inputan harus diisi');
    }
    if (form.password.length < 8) {
      alert('Minimal kata sandi 8 huruf');
    }
    if (form.konfirm_password == '') {
      alert('inputan harus diisi');
    }
    if (form.password != form.konfirm_password) {
      alert('konfirmasi kata sandi tidak sesuai');
    } else {
      var urlAksi = BASE_URL + 'api.php?op=update_pw';

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'password=' + form.password + '&id_user=' + id_user,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Data berhasil diupdate') {
            alert(responseJson);
            handleGoTo('Profile');
          } else {
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
        <Text style={styles.text_header}>Ganti Kata Sandi Baru</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Kata Sandi Baru
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Masukkan Kata Sandi Baru Anda"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={data.secureTextEntry ? true : false}
              value={form.password}
              onChangeText={(value) => onInputChange(value, 'password')}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Text style={{color: 'blue'}}>Lihat</Text>
              ) : (
                <Text style={{color: 'blue'}}>X</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Konfirmasi Kata Sandi Baru
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Konfirmasi Kata Sandi Baru"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              value={form.konfirm_password}
              onChangeText={(value) => onInputChange(value, 'konfirm_password')}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Text style={{color: 'blue'}}>Lihat</Text>
              ) : (
                <Text style={{color: 'blue'}}>X</Text>
              )}
            </TouchableOpacity>
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
                  Kirim Data
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default GantiPw;

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
