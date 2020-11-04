import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeRuang');
  //   let obj = [...data, {name, capacity, type}];
  //   AsyncStorage.storeData(obj, 'storeRuang');
  //   navigation.replace('Ruang');
  // };

  const handleAddData = async () => {
    try {
      let payload = {
        name_ruangan: name,
        kapasitas: capacity,
        jenis: type,
      };
      await AppService.createRuang(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Ruang Berhasil Ditambahkan', [
              {text: 'OK', onPress: () => navigation.replace('Ruang')},
            ]);
          } else {
            Alert.alert('Gagal Create Ruang', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Create Ruang', 'Form Mohon Diisi');
    }
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
          placeholder="Input Kapasitas"
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
