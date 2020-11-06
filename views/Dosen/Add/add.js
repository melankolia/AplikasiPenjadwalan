import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import AsyncStorage from '../../../Helper/AsyncStorage';
import AppService from '../../../services/resources/app.service';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation, route}) => {
  const [nidn, setNidn] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [lala, setlala] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleAddData = async () => {
  //   let data = await AsyncStorage.getData('storeDosen');
  //   let obj = [...data, {nidn, name, telp: phone}];
  //   AsyncStorage.storeData(obj, 'storeDosen');
  //   navigation.pop();
  // };
  const handleAddData = async () => {
    try {
      let payload = {
        nidn_dosen: nidn,
        address: address,
        nama: name,
        telp: phone,
      };
      setLoading(true);
      await AppService.createDosen(payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Dosen Berhasil Ditambahkan', [
              {text: 'OK', onPress: () => navigation.push('Dosen')},
            ]);
          } else {
            Alert.alert('Gagal Create Dosen', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Create Dosen', 'Form Mohon Diisi');
    }
  };

  const handleUpdateData = async () => {
    try {
      let payload = {
        nidn_dosen: nidn,
        address: address,
        nama: name,
        telp: phone,
      };
      const id = route.params?.nidn_dosen;
      setLoading(true);
      await AppService.updateDosen(id, payload)
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Dosen Berhasil DiUpdate', [
              {text: 'OK', onPress: () => navigation.push('Dosen')},
            ]);
          } else {
            Alert.alert('Gagal Update Dosen', 'Form Mohon Diisi');
            console.log(result);
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal Update Dosen', 'Form Mohon Diisi');
    }
  };

  const handleSave = () => {
    const id = route.params?.nidn_dosen;
    id ? handleUpdateData() : handleAddData();
  };

  useEffect(() => {
    const handleGetData = async (params) => {
      try {
        navigation.setOptions({title: 'Update Dosen'});
        setLoading(true);
        await AppService.getDetailDosen(params)
          .then(({data: {result, message}}) => {
            if (message === 'OK') {
              setNidn(result?.nidn_dosen);
              setName(result?.nama);
              setAddress(result?.address);
              setPhone(result?.telpon);
            } else {
              Alert.alert('Error', 'Gagal Mendapatkan Data Dosen');
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        Alert.alert('Error', 'Gagal Mendapatkan Data Dosen');
      }
    };

    const id = route.params?.nidn_dosen;
    id && handleGetData(id);
  }, [route.params, navigation]);

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
          disabled={loading}
          placeholder="Input NIDN Dosen"
        />
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={searchStyle}
          dense
          disabled={loading}
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
          disabled={loading}
        />
        <TextInput
          mode="outlined"
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={searchStyle}
          dense
          placeholder="Input Phone"
          disabled={loading}
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
          disabled={loading}
          onPress={() => handleSave()}>
          {loading ? 'Loading ...' : 'Save'}
        </Button>
      </View>
    </View>
  );
};

export default Add;
