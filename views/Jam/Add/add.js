import React, {useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [time, setTime] = useState('');

  const handleAddData = async () => {
    let data = await AsyncStorage.getData('storeJam');
    let obj = [...data, {time}];
    AsyncStorage.storeData(obj, 'storeJam');
    navigation.replace('Jam');
  };

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="Range Jam"
          value={time}
          style={searchStyleTop}
          onChangeText={(text) => setTime(text)}
          dense
          placeholder="Input Range Jam"
        />
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          onPress={() => handleAddData()}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default Add;
