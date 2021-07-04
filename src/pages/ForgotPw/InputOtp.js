import React, { useState} from 'react'
import {   ScrollView,  Text, View } from 'react-native'
import { Button, Input } from '../../components'
import { colors } from '../../utils'

const InputOtp = ({navigation, route}) => {
    
    
    const [form, setForm] = useState({
        otp:''
    });

   
   
    const sendData = () => {
        if(form.otp==''){
            alert('Kode OTP harus diisi');
          }else{
                var urlAksi = "http://192.168.43.91/api/api.php?op=input_otp";

                fetch(urlAksi,{
                    method:'post',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body:"otp="+form.otp+"&email="+route.params.email,
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    if (responseJson[0]=="Input OTP berhasil") {
                        alert(responseJson[0]);
                        navigation.navigate("InputPw", {email: responseJson[1]});
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
    return (
        <View style={styles.wrapper.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Button type="icon" name="back" onPress={() => navigation.navigate('InputEmail')}/>
           
            <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold', color:colors.default}}>Kode OTP</Text>
            <View style={styles.space(32)}/>
            <Text style={styles.text.desc}>Mohon isi kode otp sesuai dengan yang telah dikirim ke alamat email anda!</Text>
            <View style={styles.space(24)}/>
           
            <Input placeholder="Masukkan Kode OTP" value={form.otp} onChangeText={(value)=>onInputChange(value, 'otp')}/>
            <View style={styles.space(32)}/>
            <Button type="register" title="Submit" onPress={sendData}/>
            </ScrollView>
        </View>
    )
}

export default InputOtp;

const styles = {
    wrapper:{
        page:{padding:20}
    },
    iconBack:{width: 25, height:25},
    illustration: {width: 106, height:115, marginTop:8},
    text:{
        desc:{fontSize:14, fontWeight:'bold', color:colors.default, marginTop:16,
        maxWidth:400}
    },
    space : value => {
        return {
            height: value
        }
    }
}


