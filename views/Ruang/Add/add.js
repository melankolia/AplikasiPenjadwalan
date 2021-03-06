import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

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
              {text: 'OK', onPress: () => navigation.push('Ruang')},
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

  const handleUpdateData = async () => {
    try {
      let payload = {
        name_ruangan: name,
        kapasitas: capacity,
        jenis: type,
      };
      const id = route.params?.id_ruang;
      await AppService.updateRuang(id, payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Ruang Berhasil DiUpdate', [
              {text: 'OK', onPress: () => navigation.push('Ruang')},
            ]);
          } else {
            Alert.alert('Gagal Update Ruang', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Update Ruang', 'Form Mohon Diisi');
    }
  };

  useEffect(() => {
    const handleGetData = async (params) => {
      try {
        navigation.setOptions({title: 'Update Ruang'});
        setLoading(true);
        await AppService.getDetailRuang(params)
          .then(({data: {result, message}}) => {
            if (message === 'OK') {
              setName(result?.nama_ruangan);
              setCapacity(result?.kapasitas.toString());
              setType(result?.jenis);
            } else {
              Alert.alert('Error', 'Gagal Mendapatkan Data Ruang');
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        Alert.alert('Error', 'Gagal Mendapatkan Data Ruang');
      }
    };

    const id = route.params?.id_ruang;
    id && handleGetData(id);
  }, [route.params, navigation]);

  const handleSave = () => {
    const id = route.params?.id_ruang;
    id ? handleUpdateData() : handleAddData();
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
          disabled={loading}
          placeholder="Input Name"
        />
        <TextInput
          mode="outlined"
          label="Kapasitas"
          value={capacity}
          style={searchStyleTop}
          onChangeText={(text) => setCapacity(text)}
          dense
          disabled={loading}
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
          disabled={loading}
        />
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
