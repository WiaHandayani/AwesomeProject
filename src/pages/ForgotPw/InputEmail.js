import React, { useState} from 'react'
import {  Image,  ScrollView,  Text, View } from 'react-native'
import { Button, Input } from '../../components'
import { IconUsers } from '../../assets'
import { colors } from '../../utils'

const InputEmail = ({navigation}) => {
   
    const [form, setForm] = useState({
        email:''
    });

   
   
    const sendData = () => {
        if(form.email==''){
            alert('Silakan mengisi data dengan lengkap');
          }else{
                var urlAksi = "http://192.168.43.91/api/api.php?op=input_email";

                fetch(urlAksi,{
                    method:'post',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body:"email="+form.email
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    if (responseJson[1]=="Silahkan cek e-mail anda!") {
                        alert(responseJson[1]);
                        navigation.navigate("InputOtp",  {email: responseJson[0]});
                    }else if (responseJson=='E-mail tidak terdaftar!') {
                        console.log(responseJson[0]);
                        alert(responseJson);   
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
    return (
        <View style={styles.wrapper.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Button type="icon" name="back" onPress={() => navigation.navigate('signin')}/>
            <Image source={IconUsers} style={styles.illustration}/>
            <Text style={styles.text.desc}>Mohon isi sesuai alamat email Anda yang telah terdaftar!</Text>
            <View style={styles.space(64)}/>
            <Input placeholder="email" value={form.email} onChangeText={(value)=>onInputChange(value, 'email')}/>
            <View style={styles.space(32)}/>
            <Button type="register" title="Submit" onPress={sendData}/>
            </ScrollView>
        </View>
    )
}

export default InputEmail;

const styles = {
    wrapper:{
        page:{padding:20}
    },
    iconBack:{width: 25, height:25},
    illustration: {width: 106, height:115, marginTop:8},
    text:{
        desc:{fontSize:14, fontWeight:'bold', color: colors.default, marginTop:16,
        maxWidth:200}
    },
    space : value => {
        return {
            height: value
        }
    }
}


