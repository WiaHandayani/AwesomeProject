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
import {colors} from '../../utils';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {BASE_URL} from '../../config';

const inputRegistrasi = ({navigation, route}) => {
  const [data, setData] = React.useState({
    confirm_secureTextEntry: true,
    secureTextEntry: true,
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
    nama: '',
    password: '',
    no_hp: '',
    tgl_lahir: '',
    alamat: '',
    konfirm_password: '',
  });

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const sendData = () => {
    if (form.nama == '') {
      return alert('Inputan harus diisi');
    }
    if (form.alamat == '') {
      return alert('Inputan harus diisi');
    }
    if (form.no_hp == '') {
      return alert('Inputan harus diisi');
    }
    if (form.tgl_lahir == '') {
      return alert('Inputan harus diisi');
    }
    if (form.password == '') {
      return alert('Inputan harus diisi');
    }
    if (form.konfirm_password == '') {
      return alert('Inputan harus diisi');
    }
    if (form.password.length < 8) {
      return alert('Panjang minimal password 8 huruf');
    }
    if (form.password != form.konfirm_password) {
      return alert('konfirmasi kata sandi tidak cocok');
    } else {
      var urlAksi = BASE_URL + 'api.php?op=registrasi';
      console.log(form.tgl_lahir);
      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'nama=' +
          form.nama +
          '&password=' +
          form.password +
          '&no_hp=' +
          form.no_hp +
          '&alamat=' +
          form.alamat +
          '&tgl_lahir=' +
          form.tgl_lahir +
          '&email=' +
          route.params.email,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Registrasi berhasil') {
            alert(responseJson);
            handleGoTo('signin');
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
  const [value, onChange] = useState(new Date());

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Masukkan Data Pendaftaran!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.color_textPrivate}>
            Silahkan masukkan data anda dengan benar!
          </Text>
          <View style={{height: 48}} />
          <Text style={styles.text_footer}>Nama Pengguna</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Masukkan Nama Anda"
              style={styles.textInput}
              autoCapitalize="none"
              value={form.nama}
              onChangeText={(value) => onInputChange(value, 'nama')}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Alamat
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Masukkan Alamat Lengkap Anda"
              style={styles.textInput}
              autoCapitalize="none"
              value={form.alamat}
              onChangeText={(value) => onInputChange(value, 'alamat')}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Tanggal Lahir
          </Text>
          <View>
            {/*Showing the data of selected date*/}
            {form.tgl_lahir != null ? (
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                value={form.tgl_lahir}
              />
            ) : null}
            <Calendar
              onDayPress={(day) => {
                onInputChange(day.dateString, 'tgl_lahir');
              }}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Nomor Handphone
          </Text>
          <View style={styles.action}>
            <TextInput
              keyboardType="numeric"
              maxLength={12}
              placeholder="Masukkan Nomor Handphone Anda"
              style={styles.textInput}
              autoCapitalize="none"
              value={form.no_hp}
              onChangeText={(value) => onInputChange(value, 'no_hp')}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Kata Sandi
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Masukkan Kata Sandi Anda"
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
            Konfirmasi Kata Sandi
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Konfirmasi Kata Sandi"
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

export default inputRegistrasi;

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
