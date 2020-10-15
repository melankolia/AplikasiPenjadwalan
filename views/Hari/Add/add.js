import React, {useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer, addButton} = style;

const Add = ({navigation}) => {
  const [hari, setHari] = useState('');

  const handleAddData = async () => {
    let data = await AsyncStorage.getData('storeHari');
    let obj = [...data, {hari}];
    AsyncStorage.storeData(obj, 'storeHari');
    navigation.replace('Hari');
  };

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="Hari"
          value={hari}
          style={searchStyleTop}
          onChangeText={(text) => setHari(text)}
          dense
          placeholder="Input Hari"
        />
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          style={addButton}
          onPress={() => handleAddData()}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default Add;
