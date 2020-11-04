import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [time, setTime] = useState('');

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeJam');
  //   let obj = [...data, {time}];
  //   AsyncStorage.storeData(obj, 'storeJam');
  //   navigation.replace('Jam');
  // };

  const handleAddData = async () => {
    try {
      let payload = {
        range_jam: time,
      };
      console.log(payload);
      await AppService.createJam(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Jam Berhasil Ditambahkan', [
              {text: 'OK', onPress: () => navigation.replace('Jam')},
            ]);
          } else {
            Alert.alert('Gagal Create Jam', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Create Jam', 'Form Mohon Diisi');
    }
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
