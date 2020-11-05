import React, {useState, useEffect} from 'react';
import {View, Alert, Text, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import AppService from '../../services/resources/app.service';
import {
  DataTable,
  Headline,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import style from './index.style.js';

const {
  container,
  titleContainerText,
  searchStyle,
  containerPicker,
  pickerStyle,
  headerStyle,
  actionCell,
  addButton,
} = style;

function HomeScreen({navigation}) {
  const [listException, setListException] = useState([]);
  const [check, setCheck] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDropDown, setLoadingDropDown] = useState(false);
  const [errors, setErrors] = useState(false);
  const [NIDN_Dosen, setNIDN_Dosen] = useState('');
  const [listDosen, setListDosen] = useState('');

  const getDataDropdown = async () => {
    try {
      setLoadingDropDown(true);
      await AppService.getDosenAvailable()
        .then(({data: {message, result}}) => {
          if (message === 'OK') {
            // result[0] && setNIDN_Dosen(result[0].nidn_dosen);
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
        .finally(() => setLoadingDropDown(false));
    } catch (error) {
      console.log(error);
      setErrors(true);
      Alert.alert('Error', 'Gagal Dapat Data Dosen');
    }
  };

  const getDataException = async (params) => {
    try {
      let payload = {
        name_hari: params,
      };
      setLoading(true);
      await AppService.getException(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            // setValue(result);
            result.map((e) => (e.status = false));
            setListException(result);
          } else {
            Alert.alert('Error', 'Gagal Mendapatkan Data Sesi');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal Mendapatkan Data Sesi');
    }
  };

  const handlerCheckBox = (val, index) => {
    let newVal = [...listException];
    let tempObj = newVal.find((e, i) => i === index);
    tempObj && (newVal[index].status = !val.status);
    tempObj && (newVal[index] = tempObj);
    setListException(newVal);
  };

  const handlerCreateEx = async (params, callback) => {
    try {
      setLoading(true);
      let payload = listException.filter((e) => e.status === true);
      payload.map((e) => (e.nidn_dosen = NIDN_Dosen));

      await AppService.createException(payload, {nidn_dosen: params})
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            Alert.alert('Success', 'Berhasil Menyimpan Data');
            callback && callback();
            // result.map((e) => (e.status = false));
            // setListException(result);
          } else {
            Alert.alert('Error', 'Gagal Menyimpan Data');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal Menyimpan Data');
    }
  };

  const confirmation = (text, cb) => {
    Alert.alert('Caution', text, [
      {text: 'CANCEL', onPress: () => {}},
      {text: 'OK', onPress: () => cb()},
    ]);
  };

  useEffect(() => {
    getDataDropdown();
    getDataException();
  }, []);

  useEffect(() => {
    getDataException(search);
  }, [search, NIDN_Dosen]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Waktu Tidak Bersedia</Headline>
          <TextInput
            label="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={searchStyle}
            dense
          />
        </View>
        <View style={containerPicker}>
          <Text>Pilih Dosen</Text>
          <Picker
            selectedValue={NIDN_Dosen}
            style={pickerStyle}
            enabled={!loadingDropDown && !errors}
            onValueChange={(itemValue) =>
              NIDN_Dosen
                ? confirmation('Save dahulu sebelum ganti dosen ?', () =>
                    handlerCreateEx(itemValue, () => setNIDN_Dosen(itemValue)),
                  )
                : setNIDN_Dosen(itemValue)
            }>
            <Picker.Item value="" label="Select Dosen ..." />
            {listDosen ? (
              listDosen.map((e, i) => (
                <Picker.Item
                  label={e.nama_dosen}
                  value={e.nidn_dosen}
                  key={i}
                />
              ))
            ) : (
              <Picker.Item label="No Data" value="" />
            )}
          </Picker>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Hari</DataTable.Title>
            <DataTable.Title>Jam</DataTable.Title>
            <DataTable.Title style={actionCell}>Status</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {listException.length > 0 ? (
              listException.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{val.nama_hari}</DataTable.Cell>
                  <DataTable.Cell>{val.range_jam}</DataTable.Cell>
                  <DataTable.Cell style={actionCell}>
                    <CheckBox
                      disabled={false}
                      value={val.status}
                      onValueChange={() => handlerCheckBox(val, index)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Row style={actionCell}>
                <DataTable.Cell>
                  {loading ? 'Loading ...' : 'No Data Available'}
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </ScrollView>

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-3 of 3"
          />
        </DataTable>
      </ScrollView>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          style={addButton}
          disabled={loading}
          onPress={() => {
            NIDN_Dosen
              ? confirmation('Apakah data sudah benar ?', () =>
                  handlerCreateEx(NIDN_Dosen),
                )
              : Alert.alert('Error', 'Silahkan pilih dosen terlebih dahulu');
          }}>
          Save
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
