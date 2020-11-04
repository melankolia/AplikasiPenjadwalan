import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [nidn, setNidn] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [lala, setlala] = useState('');

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeDosen');
  //   let obj = [...data, {nidn, name, telp: phone}];
  //   AsyncStorage.storeData(obj, 'storeDosen');
  //   navigation.replace('Dosen');
  // };
  const handleAddData = async () => {
    try {
      let payload = {
        nidn_dosen: nidn,
        nama: name,
        telp: phone,
      };
      await AppService.createDosen(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Dosen Berhasil Ditambahkan', [
              {text: 'OK', onPress: () => navigation.replace('Dosen')},
            ]);
          } else {
            Alert.alert('Gagal Create Dosen', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Create Dosen', 'Form Mohon Diisi');
    }
  };

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="NIDN Dosen"
          value={nidn}
          style={searchStyleTop}
          onChangeText={(text) => setNidn(text)}
          dense
          placeholder="Input NIDN Dosen"
        />
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={searchStyle}
          dense
          placeholder="Input Name"
        />
        <TextInput
          mode="outlined"
          label="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={searchStyle}
          placeholder="Input Address"
          multiline
        />
        <TextInput
          mode="outlined"
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={searchStyle}
          dense
          placeholder="Input Phone"
        />
        {/* <TextInput
          mode="outlined"
          label="lala"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={searchStyle}
          dense
          placeholder="Input lala"
        /> */}
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
