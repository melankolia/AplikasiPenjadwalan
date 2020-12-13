/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
// import AsyncStorage from '../../Helper/AsyncStorage';
import AppService from '../../services/resources/app.service';
import BackFlat from '../../components/BackFlat';
import style from './index.style';

const {
  container,
  textSignUp,
  textHello,
  textWelcome,
  usernameStyle,
  nameStyle,
  passwordStyle,
  registerStyle,
  textPolicy,
  textRegister,
} = style;

const Register = ({navigation}) => {
  const [userName, setuserName] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');

  // function setUpAccount() {
  //   let obj = {
  //     username: userName,
  //     name,
  //     password,
  //   };
  //   console.log(obj);
  //   AsyncStorage.storeData(obj, 'setUpAccount');
  //   navigation.navigate('Welcome');
  // }

  const handleRegister = () => {
    if (userName && password) {
      setUpAccount();
    } else {
      Alert.alert('Error', 'Silahkan isi Username dan Password');
    }
  };

  const setUpAccount = async () => {
    let payload = {
      username: userName,
      name: name,
      password: password,
    };
    try {
      await AppService.register(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            Alert.alert(
              'Selamat anda berhasil registrasi',
              'Silahkan login dengan akun anda',
            );
            navigation.navigate('Welcome');
          } else {
            Alert.alert('Error', 'Gagal Registrasi');
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('Error', 'Gagal Registrasi');
    }
  };

  return (
    <ScrollView>
      <View style={container}>
        <BackFlat navigation={navigation} />
        <Text style={textSignUp}>Sign Up</Text>
        <Text style={textHello}>Hello there !</Text>
        <Text style={textWelcome}>Welcome to you</Text>
        <Input
          inputContainerStyle={{marginLeft: -10, height: 35}}
          containerStyle={{marginBottom: 15}}
          labelStyle={usernameStyle}
          label="Username"
          placeholder="Enter Username"
          inputStyle={{fontSize: 12}}
          onChange={(e) => {
            setuserName(e.nativeEvent.text);
          }}
        />
        <Input
          inputContainerStyle={{marginLeft: -10, height: 35}}
          containerStyle={{marginBottom: 15}}
          labelStyle={nameStyle}
          label="Name"
          placeholder="Enter Name"
          inputStyle={{fontSize: 12}}
          onChange={(e) => {
            setname(e.nativeEvent.text);
          }}
        />
        <Input
          inputContainerStyle={{marginLeft: -10, height: 35}}
          containerStyle={{marginBottom: 15}}
          labelStyle={passwordStyle}
          secureTextEntry={true}
          label="Password"
          placeholder="Enter Password"
          inputStyle={{fontSize: 12}}
          onChange={(e) => {
            setpassword(e.nativeEvent.text);
          }}
        />
        <TouchableOpacity
          style={registerStyle}
          onPress={() => handleRegister()}>
          <Text style={textRegister}>Register</Text>
        </TouchableOpacity>
        <Text style={textPolicy}>
          By registering with this App, you are agree to our Term of Use and our
          Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;
