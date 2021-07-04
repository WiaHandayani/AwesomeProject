// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../pages/Welcome';
import Home from '../pages/isLogged/Home';
import Splash from '../Splashscreen';
import Maps from '../pages/Maps';
import signin from '../pages/signin';
import signup from '../pages/signup';
import kodeOtp from '../pages/kodeOtp';
import inputRegistrasi from '../pages/inputRegistrasi';
import help from '../pages/help';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import edit_profil from '../pages/edit_profil';
import Maps_ from '../pages/Maps_';
import Cari from '../pages/Cari';
import Riwayat from '../pages/Riwayat';
import AktivitasScreen from '../pages/AktivitasScreen';
import GantiPw from '../pages/GantiPw';
import TentangApk from '../pages/TentangApk';
import KetentuanLayanan from '../pages/KetentuanLayanan';
import KebijakanPrivasi from '../pages/KebijakanPrivasi';
import Question1 from '../pages/help/Question1';
import Question2 from '../pages/help/Question2';
import Question3 from '../pages/help/Question3';
import Question4 from '../pages/help/Question4';
import Question5 from '../pages/help/Question5';
import Question6 from '../pages/help/Question6';
import Question7 from '../pages/help/Question7';
import Question8 from '../pages/help/Question8';
import Question9 from '../pages/help/Question9';
import Question10 from '../pages/help/Question10';
import Question11 from '../pages/help/Question11';
import Question12 from '../pages/help/Question12';
import Question13 from '../pages/help/Question13';
import Question14 from '../pages/help/Question14';
import InputEmail from '../pages/ForgotPw/InputEmail';
import InputOtp from '../pages/ForgotPw/InputOtp';
import InputPw from '../pages/ForgotPw/InputPw';
import Barbershop from '../pages/TampilinData/Barbershop';
import Salon from '../pages/TampilinData/Salon';



const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name="signin" component={signin} options={{headerShown:false}}/>
            <Stack.Screen name="kodeOtp" component={kodeOtp} options={{headerShown:false}}/>
            <Stack.Screen name="signup" component={signup} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="inputRegistrasi" component={inputRegistrasi} options={{headerShown:false}}/>
            <Stack.Screen name="maps" component={Maps} options={{headerShown:false}}/>
            <Stack.Screen name="welcome" component={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name="help" component={help} options={{headerShown:false}}/>
            <Stack.Screen name="Auth" component={Auth} options={{headerShown:false}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
            <Stack.Screen name="Edit_Profile" component={edit_profil} options={{headerShown:false}}/>
            <Stack.Screen name="Maps_" component={Maps_} options={{headerShown:false}}/>
            <Stack.Screen name="Cari" component={Cari} options={{headerShown:false}}/>
            <Stack.Screen name="Riwayat" component={Riwayat} options={{headerShown:false}}/>
            <Stack.Screen name="AktivitasScreen" component={AktivitasScreen} options={{headerShown:false}}/>
            <Stack.Screen name="GantiPw" component={GantiPw} options={{headerShown:false}}/>
            <Stack.Screen name="TentangApk" component={TentangApk} options={{headerShown:false}}/>
            <Stack.Screen name="KetentuanLayanan" component={KetentuanLayanan} options={{headerShown:false}}/>
            <Stack.Screen name="KebijakanPrivasi" component={KebijakanPrivasi} options={{headerShown:false}}/>
            <Stack.Screen name="Question1" component={Question1} options={{headerShown:false}}/>
            <Stack.Screen name="Question2" component={Question2} options={{headerShown:false}}/>
            <Stack.Screen name="Question3" component={Question3} options={{headerShown:false}}/>
            <Stack.Screen name="Question4" component={Question4} options={{headerShown:false}}/>
            <Stack.Screen name="Question5" component={Question5} options={{headerShown:false}}/>
            <Stack.Screen name="Question6" component={Question6} options={{headerShown:false}}/>
            <Stack.Screen name="Question7" component={Question7} options={{headerShown:false}}/>
            <Stack.Screen name="Question8" component={Question8} options={{headerShown:false}}/>
            <Stack.Screen name="Question9" component={Question9} options={{headerShown:false}}/>
            <Stack.Screen name="Question10" component={Question10} options={{headerShown:false}}/>
            <Stack.Screen name="Question11" component={Question11} options={{headerShown:false}}/>
            <Stack.Screen name="Question12" component={Question12} options={{headerShown:false}}/>
            <Stack.Screen name="Question13" component={Question13} options={{headerShown:false}}/>
            <Stack.Screen name="Question14" component={Question14} options={{headerShown:false}}/>
            <Stack.Screen name="InputOtp" component={InputOtp} options={{headerShown:false}}/>
            <Stack.Screen name="InputEmail" component={InputEmail} options={{headerShown:false}}/>
            <Stack.Screen name="InputPw" component={InputPw} options={{headerShown:false}}/>
            <Stack.Screen name="Barbershop" component={Barbershop} options={{headerShown:false}}/>
            <Stack.Screen name="Salon" component={Salon} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}


export default Router; // router di import di App.js, 