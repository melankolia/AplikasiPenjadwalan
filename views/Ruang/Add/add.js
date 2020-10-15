import React, {useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');

  const handleAddData = async () => {
    let data = await AsyncStorage.getData('storeRuang');
    let obj = [...data, {name, capacity, type}];
    AsyncStorage.storeData(obj, 'storeRuang');
    navigation.replace('Ruang');
  };

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="Nama"
          value={name}
          onChangeText={(text) => setName(text)}
          style={searchStyle}
          dense
          placeholder="Input Name"
        />
        <TextInput
          mode="outlined"
          label="Kapasitas"
          value={capacity}
          style={searchStyleTop}
          onChangeText={(text) => setCapacity(text)}
          dense
          placeholder="Input NIDN"
        />
        <TextInput
          mode="outlined"
          label="Jenis"
          value={type}
          onChangeText={(text) => setType(text)}
          style={searchStyle}
          placeholder="Input Jenis"
          multiline
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
