/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import AsyncStorage from '../../Helper/AsyncStorage';
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

  function setUpAccount() {
    let obj = {
      username: userName,
      name,
      password,
    };
    console.log(obj);
    AsyncStorage.storeData(obj, 'setUpAccount');
    navigation.navigate('Welcome');
  }

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
        <TouchableOpacity style={registerStyle} onPress={() => setUpAccount()}>
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
