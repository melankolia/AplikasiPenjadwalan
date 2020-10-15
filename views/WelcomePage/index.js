/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import style from './index.style';

const {
  container,
  firstTitle,
  secondTitle,
  imageStyle,
  containerButton,
  signInStyle,
  signUpStyle,
} = style;

const Started = ({navigation}) => {
  return (
    <View style={container}>
      <Text style={firstTitle}>
        Atur jadwal kuliah jurusan anda, praktis dan gratis
      </Text>
      <Text style={secondTitle}>
        Aplikasi ini akan memudahkan anda mengatur jadwal kuliah yang biasanya
        menyusahkan
      </Text>
      <Image
        style={imageStyle}
        source={require('../../assets/images/WelcomePage.png')}
      />
      <View style={containerButton}>
        <TouchableOpacity
          style={signInStyle}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontSize: 16,
              color: '#AB84C8',
              fontFamily: 'AirbnbCerealMedium',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signUpStyle}
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'AirbnbCerealMedium',
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Started;
