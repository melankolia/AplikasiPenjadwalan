import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer} = style;

const Add = ({navigation, route}) => {
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const handleGetData = async (params) => {
      try {
        navigation.setOptions({title: 'Update Jam'});
        setLoading(true);
        await AppService.getDetailJam(params)
          .then(({data: {result, message}}) => {
            if (message === 'OK') {
              setTime(result?.range_jam);
            } else {
              Alert.alert('Error', 'Gagal Mendapatkan Data Jam');
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        Alert.alert('Error', 'Gagal Mendapatkan Data Jam');
      }
    };

    const id = route.params?.id_jam;
    id && handleGetData(id);
  }, [route.params, navigation]);

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
          disabled={loading}
          placeholder="Input Range Jam"
        />
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          disabled={loading}
          onPress={() => handleAddData()}>
          {loading ? 'Loading ...' : 'Save'}
        </Button>
      </View>
    </View>
  );
};

export default Add;
