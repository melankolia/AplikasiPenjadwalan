/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View, Alert} from 'react-native';
import AsyncStorage from '../../Helper/AsyncStorage';
import BackFlat from '../../components/BackFlat';
import style from './index.style';
import AppService from '../../services/resources/app.service';

const {
  container,
  usernameStyle,
  textProceed,
  textLogin,
  inputContainer,
  inputLabel,
  buttonLogin,
  textButtonLogin,
  textForget,
} = style;

const SignIn = ({navigation}) => {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleLogin = async () => {
  //   let data = await AsyncStorage.getData('setUpAccount');
  //   if (userName === data.username && password === data.password) {
  //     navigation.replace('Home');
  //   } else {
  //     Alert.alert('Login Failed', 'Username / Password Salah');
  //   }
  // };

  const handleLogin = async () => {
    // try {
    let payload = {
      username: userName,
      password: password,
    };
    setLoading(true);
    try {
      await AppService.login(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            // Check Jadwal
            AsyncStorage.storeData(result, 'userDetail');
            result?.role === 'admin'
              ? checkJadwal()
              : navigation.replace('JadwalKuliah');
          } else {
            Alert.alert('Login Failed', 'Username / Password Salah');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const checkJadwal = async () => {
    try {
      setLoading(true);
      await AppService.checkMatkul()
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            result?.TotalJadwal > 0
              ? navigation.replace('JadwalKuliah')
              : navigation.replace('Home');
          } else {
            Alert.alert('Error', 'Gagal Check Jadwal Matkul');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal Check Jadwal Matkul');
    }
  };

  return (
    <ScrollView>
      <View style={container}>
        <BackFlat navigation={navigation} />
        <Text style={textProceed}>Proceed with your</Text>
        <Text style={textLogin}>Login</Text>
        <Input
          inputContainerStyle={inputContainer}
          containerStyle={{marginBottom: 15}}
          labelStyle={usernameStyle}
          label="Username"
          onChange={(e) => {
            setuserName(e.nativeEvent.text);
          }}
        />
        <Input
          inputContainerStyle={{marginLeft: -10, height: 35}}
          labelStyle={inputLabel}
          secureTextEntry={true}
          label="Password"
          onChange={(e) => {
            setpassword(e.nativeEvent.text);
          }}
        />
        <TouchableOpacity
          style={buttonLogin}
          disabled={loading}
          onPress={() => handleLogin()}>
          <Text style={textButtonLogin}>
            {loading ? 'Loading ...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <Text style={textForget}>Forgot Password ?</Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
