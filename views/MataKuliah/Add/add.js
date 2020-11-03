import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {TextInput, Colors, Button} from 'react-native-paper';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sks, setSKS] = useState('');
  const [semester, setSemester] = useState('');
  const [NIDN_Dosen, setNIDN_Dosen] = useState('');

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeMatkul');
  //   let obj = [...data, {codeMk: code, name, sks, semester, jenis: category}];
  //   AsyncStorage.storeData(obj, 'storeMatkul');
  //   navigation.replace('Matakuliah');
  // };

  const handleAddData = async () => {
    try {
      let payload = {
        kode_mk: code,
        name_mk: name,
        jenis: category,
        sks: sks,
        semester: semester,
        nidn_dosen: NIDN_Dosen,
      };
      await AppService.createMatkul(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Mata Kuliah Berhasil Ditambahkan', [
              {text: 'OK', onPress: () => navigation.replace('Matakuliah')},
            ]);
          } else {
            Alert.alert('Gagal Create Matakuliah', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('Gagal Create Matakuliah', 'Form Mohon Diisi');
    }
  };

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="Kode Matakuliah"
          value={code}
          style={searchStyleTop}
          onChangeText={(text) => setCode(text)}
          dense
          placeholder="Input Kode Matakuliah"
        />
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
          label="Jenis"
          value={category}
          onChangeText={(text) => setCategory(text)}
          style={searchStyle}
          placeholder="Input Kategori"
          multiline
        />
        <TextInput
          mode="outlined"
          label="SKS"
          value={sks}
          onChangeText={(text) => setSKS(text)}
          style={searchStyle}
          dense
          placeholder="Input SKS"
        />
        <TextInput
          mode="outlined"
          label="Semester"
          value={semester}
          onChangeText={(text) => setSemester(text)}
          style={searchStyle}
          dense
          placeholder="Input Semester"
        />
        <TextInput
          mode="outlined"
          label="Dosen Pengampu"
          value={NIDN_Dosen}
          onChangeText={(text) => setNIDN_Dosen(text)}
          style={searchStyle}
          dense
          placeholder="NIDN Dosen"
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
