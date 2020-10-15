/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BackFlat = (props) => {
  return (
    <TouchableOpacity
      style={{height: 65, width: 80}}
      onPress={() => props.navigation.goBack()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: 80,
          marginLeft: -35,
        }}>
        <Icon name="angle-left" size={20} />
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'AirbnbCerealBook',
            marginLeft: 5,
          }}>
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackFlat;
