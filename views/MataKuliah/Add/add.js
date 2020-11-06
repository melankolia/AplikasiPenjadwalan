import React, {useState, useEffect} from 'react';
import {View, Alert, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Colors, Button} from 'react-native-paper';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';

import style from './index.style.js';

const {
  container,
  searchStyle,
  searchStyleTop,
  textContainer,
  containerDropdown,
  pickerStyle,
} = style;

const Add = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sks, setSKS] = useState('');
  const [semester, setSemester] = useState('');
  const [NIDN_Dosen, setNIDN_Dosen] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [listDosen, setListDosen] = useState('');

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeMatkul');
  //   let obj = [...data, {codeMk: code, name, sks, semester, jenis: category}];
  //   AsyncStorage.storeData(obj, 'storeMatkul');
  //   navigation.replace('Matakuliah');
  // };

  useEffect(() => {
    const handleGetData = async (params) => {
      try {
        navigation.setOptions({title: 'Update Matakuliah'});
        setLoading(true);
        await AppService.getDetailMatkul(params)
          .then(({data: {result, message}}) => {
            if (message === 'OK') {
              setCode(result.kode_mk);
              setName(result.name_mk);
              setCategory(result.jenis);
              setSKS(result.sks.toString());
              setSemester(result.semester.toString());
              setNIDN_Dosen(result.nidn_dosen);
            } else {
              Alert.alert('Error', 'Gagal Mendapatkan Data Matakuliah');
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        Alert.alert('Error', 'Gagal Mendapatkan Data Matakuliah');
      }
    };

    getDataDropdown();

    const id = route.params?.id_matkul;
    id && handleGetData(id);
  }, [route.params, navigation]);

  const getDataDropdown = async () => {
    try {
      setLoading(true);
      await AppService.getDosen()
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            result[0] && setNIDN_Dosen(result[0].nidn_dosen);
            setListDosen(result);
          } else {
            Alert.alert('Error', 'Gagal Dapat Data Dosen');
            setErrors(true);
            console.log(result);
          }
        })
        .catch((err) => {
          setErrors(true);
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      setErrors(true);
      Alert.alert('Error', 'Gagal Dapat Data Dosen');
    }
  };

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
              {text: 'OK', onPress: () => navigation.push('Matakuliah')},
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
      console.log(error);
      Alert.alert('Gagal Create Matakuliah', 'Form Mohon Diisi');
    }
  };

  const handleUpdateData = async () => {
    try {
      let payload = {
        kode_mk: code,
        name_mk: name,
        jenis: category,
        sks: sks,
        semester: semester,
        nidn_dosen: NIDN_Dosen,
      };
      const id = route.params?.id_matkul;

      await AppService.updateMatkul(id, payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Mata Kuliah Berhasil DiUpdate', [
              {text: 'OK', onPress: () => navigation.push('Matakuliah')},
            ]);
          } else {
            Alert.alert('Gagal Update Matakuliah', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Update Matakuliah', 'Form Mohon Diisi');
    }
  };

  const handleSave = () => {
    const id = route.params?.id_matkul;
    id ? handleUpdateData() : handleAddData();
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
          disabled={loading}
          placeholder="Input Kode Matakuliah"
        />
        <TextInput
          mode="outlined"
          label="Nama"
          value={name}
          onChangeText={(text) => setName(text)}
          style={searchStyle}
          dense
          disabled={loading}
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
          disabled={loading}
        />
        <TextInput
          mode="outlined"
          label="SKS"
          value={sks}
          onChangeText={(text) => setSKS(text)}
          style={searchStyle}
          dense
          disabled={loading}
          placeholder="Input SKS"
        />
        <TextInput
          mode="outlined"
          label="Semester"
          value={semester}
          onChangeText={(text) => setSemester(text)}
          style={searchStyle}
          dense
          disabled={loading}
          placeholder="Input Semester"
        />
        {/* <TextInput
          mode="outlined"
          label="Dosen Pengampu"
          value={NIDN_Dosen}
          onChangeText={(text) => setNIDN_Dosen(text)}
          style={searchStyle}
          dense
          placeholder="NIDN Dosen"
        /> */}
        <View style={containerDropdown}>
          <Text>Pilih Dosen Pengampu</Text>
          <Picker
            selectedValue={NIDN_Dosen}
            style={pickerStyle}
            enabled={!loading && !errors}
            onValueChange={(itemValue) => setNIDN_Dosen(itemValue)}>
            {listDosen ? (
              listDosen.map((e, i) => (
                <Picker.Item label={e.nama} value={e.nidn_dosen} key={i} />
              ))
            ) : (
              <Picker.Item label="No Data" value="" />
            )}
          </Picker>
        </View>
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          disabled={loading}
          onPress={() => handleSave()}>
          {loading ? 'Loading ...' : 'Save'}
        </Button>
      </View>
    </View>
  );
};

export default Add;
