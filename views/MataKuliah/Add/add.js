import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Colors, Button} from 'react-native-paper';
import AsyncStorage from '../../../Helper/AsyncStorage';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sks, setSKS] = useState('');
  const [semester, setSemester] = useState('');

  const handleAddData = async () => {
    let data = await AsyncStorage.getData('storeMatkul');
    let obj = [...data, {codeMk: code, name, sks, semester, jenis: category}];
    AsyncStorage.storeData(obj, 'storeMatkul');
    navigation.replace('Matakuliah');
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
          label="Category"
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
