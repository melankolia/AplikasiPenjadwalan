/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '../../Helper/AsyncStorage';
import BackFlat from '../../components/BackFlat';
import style from './index.style';

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

  const handleLogin = async () => {
    let data = await AsyncStorage.getData('setUpAccount');
    console.log(data);
    if (userName === data.username && password === data.password) {
      navigation.replace('Home');
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
        <TouchableOpacity style={buttonLogin} onPress={() => handleLogin()}>
          <Text style={textButtonLogin}>Login</Text>
        </TouchableOpacity>
        <Text style={textForget}>Forgot Password ?</Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
