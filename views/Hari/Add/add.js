import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer, addButton} = style;

const Add = ({navigation, route}) => {
  const [hari, setHari] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeHari');
  //   let obj = [...data, {hari}];
  //   AsyncStorage.storeData(obj, 'storeHari');
  //   navigation.replace('Hari');
  // };

  const handleAddData = async () => {
    try {
      let payload = {
        name_hari: hari,
      };
      setLoading(true);
      await AppService.createHari(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Hari Berhasil Ditambahkan', [
              {text: 'OK', onPress: () => navigation.replace('Hari')},
            ]);
          } else {
            Alert.alert('Gagal Create Hari', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Create Jam', 'Form Mohon Diisi');
    }
  };

  useEffect(() => {
    const handleGetData = async (params) => {
      try {
        navigation.setOptions({title: 'Update Hari'});
        setLoading(true);
        await AppService.getDetailHari(params)
          .then(({data: {result, message}}) => {
            if (message === 'OK') {
              setHari(result?.name_hari);
            } else {
              Alert.alert('Error', 'Gagal Mendapatkan Data Hari');
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        Alert.alert('Error', 'Gagal Mendapatkan Data Hari');
      }
    };

    const id = route.params?.id_hari;
    id && handleGetData(id);
  }, [route.params, navigation]);

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
          disabled={loading}
          placeholder="Input Hari"
        />
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          style={addButton}
          disabled={loading}
          onPress={() => handleAddData()}>
          {loading ? 'Loading ...' : 'Save'}
        </Button>
      </View>
    </View>
  );
};

export default Add;
