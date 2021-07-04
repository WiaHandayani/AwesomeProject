import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    View, 
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import {
    Avatar
  } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils'
import DocumentPicker from 'react-native-document-picker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const edit_profil = ({navigation, route}) => {

    const [form, setForm] = useState({
        nama: route.params.nama,
        email: route.params.email,
        no_hp: route.params.no_hp,
        foto_profil: route.params.foto_profil,
        alamat: route.params.alamat,
        tgl_lahir: route.params.tgl_lahir
    });

    const [singleFile, setSingleFile] = useState(form.foto_profil);

    const handleGoTo = (screen) => {
        navigation.navigate(screen);
    }
   
    const sendData = () => {
        if(form.nama==''){
            alert('data harus diisi');
          }else{
                var urlAksi = "http://192.168.43.91/api/api.php?op=update";
                const fileToUpload = singleFile;
                const data = new FormData();
                data.append('id_user', route.params.id_user);
                data.append('nama', form.nama);
                data.append('email', form.email);
                data.append('no_hp', form.no_hp);
                data.append('alamat', form.alamat);
                data.append('tgl_lahir', form.tgl_lahir);
                data.append('foto_lama', form.foto_profil);
                data.append('file_attachment', fileToUpload);
                fetch(urlAksi,{
                    method:'post',
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    body:data,
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    if (responseJson[0]=="Data berhasil diupdate") {
                        
                        AsyncStorage.setItem('nama',responseJson[1])
                        AsyncStorage.setItem('email',responseJson[2])
                        AsyncStorage.setItem('no_hp',responseJson[3])
                        AsyncStorage.setItem('foto_profil',responseJson[4])
                        AsyncStorage.setItem('alamat',responseJson[5])
                        AsyncStorage.setItem('tgl_lahir',responseJson[6])
                     alert(responseJson[0]);
                     handleGoTo("Profile");
                     console.log(responseJson);
                    }else{
                        alert(responseJson[0]);
                    }
                 })
                 .catch((error)=>{
                    console.log(error.message);
                    
                 });
              
        }
        
    };

    const onInputChange = (value, input) => {
        setForm({
            ...form,
            [input]: value
        });
    };

    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
          const res = await DocumentPicker.pick({
            // Provide which type of file you want user to pick
            type: [DocumentPicker.types.allFiles],
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          // Setting the state to show single file attributes
          setSingleFile(res);
        } catch (err) {
          setSingleFile(null);
          // Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            alert('Canceled');
          } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };



    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#4169E1' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Edit Profil</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            
            <TouchableOpacity
                onPress={selectFile}
                >
        {/*Showing the data of selected Single file*/}
      {singleFile.uri == null ? (
    <Avatar.Image 
      source={{
        uri: 'http://192.168.43.91/api/uploads/'+form.foto_profil,
      }}
      size={80}
    />
      ) : null}
                
          {/*Showing the data of selected Single file*/}
      {singleFile.uri != null ? (
       <Avatar.Image 
       source={{
         uri: singleFile.uri,
       }}
       size={80}/>
      ) : null}
            </TouchableOpacity>
    
      <View style={{height:24}}/>
            <Text style={styles.text_footer}>Nama Pengguna</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Masukkan Nama Anda"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={form.nama} onChangeText={(value)=>onInputChange(value, 'nama')}
                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Email</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Masukkan Email Anda"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={form.email} onChangeText={(value)=>onInputChange(value, 'email')}
                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Alamat</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Masukkan Alamat Lengkap Anda"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={form.alamat} onChangeText={(value)=>onInputChange(value, 'alamat')}
                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Tanggal Lahir</Text>
            <View style={styles.action}>
            <TextInput 
                    placeholder="Masukkan Alamat Lengkap Anda"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={form.tgl_lahir}
                />
            
            </View>
            <Calendar
            onDayPress={day => {
                onInputChange(day.dateString, 'tgl_lahir')
              }}/>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Nomor Handphone</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Masukkan Nomor Handphone Anda"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={form.no_hp} onChangeText={(value)=>onInputChange(value, 'no_hp')}
                />
            </View>
            

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={sendData}
                >
                <LinearGradient
                    colors={['#4169E1','#4169E1']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Kirim Data</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default edit_profil;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: colors.default
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
      },
      textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
      },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
