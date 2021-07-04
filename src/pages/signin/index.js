import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { colors } from '../../utils'

const signin = ({navigation}) => {
    
      
    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const handleGoTo = (screen) => {
        navigation.navigate(screen);
    }


    const sendData = () => {
        if(form.email==''){
            alert('Silakan isi username dan password untuk login');
          }else{
                var urlAksi = "http://192.168.43.91/api/api.php?op=login";

                fetch(urlAksi,{
                    method:'post',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body:"email="+form.email+"&password="+form.password
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                   if (responseJson[0]=="Login Berhasil") {
                       AsyncStorage.setItem('nama',responseJson[1])
                       AsyncStorage.setItem('id_user',responseJson[2])
                       AsyncStorage.setItem('email',responseJson[3])
                       AsyncStorage.setItem('no_hp',responseJson[4])
                       AsyncStorage.setItem('foto_profil',responseJson[5])
                       AsyncStorage.setItem('alamat',responseJson[6])
                       AsyncStorage.setItem('tgl_lahir',responseJson[7])
                    alert(responseJson[0]);
                    handleGoTo("Home");
                   }else{
                       alert(responseJson[0]);
                   }
                })
              
        }
    };

    const onInputChange = (value, input) => {
        setForm({
            ...form,
            [input]: value
        });
    };

    const [data, setData] = React.useState({
        secureTextEntry: true
    });

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#4169E1' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Selamat Datang!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>E-mail</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Masukkan Email Anda"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={form.email} onChangeText={(value)=>onInputChange(value, 'email')}
                />
            </View>
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Kata Sandi</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Masukkan Kata Sandi Anda"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={form.password} onChangeText={(value)=>onInputChange(value, 'password')}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Text style={{color: 'blue'}}>Lihat</Text>
                    :
                    <Text style={{color: 'blue'}}>X</Text>
                    }
                </TouchableOpacity>
            </View>
            

            <TouchableOpacity onPress={() => navigation.navigate('InputEmail')}>
                <Text style={{color: '#4169E1', marginTop:15}}>Lupa Kata Sandi?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={sendData}
                >
                <LinearGradient
                    colors={['#4169E1', '#4169E1']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Masuk</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('signup')}
                    style={[styles.signIn, {
                        borderColor: '#4169E1',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#4169E1'
                    }]}>Daftar</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default signin;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: colors.default
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
