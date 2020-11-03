import React, {useState, useEffect} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import {
  DataTable,
  Headline,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import AsyncStorage from '../../Helper/AsyncStorage';
import AppService from '../../services/resources/app.service';
import style from './index.style.js';

const {
  container,
  titleContainerText,
  searchStyle,
  headerStyle,
  actionCell,
  addButton,
} = style;

function MatakuliahScreen({navigation}) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleGetData = async () => {
  //   let data = await AsyncStorage.getData('storeMatkul');
  //   setValue(data);
  // };

  const handleGetData = async (params) => {
    try {
      let payload = {
        name_mk: params,
      };
      setLoading(true);
      await AppService.getJadwalKuliah(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            setValue(result);
          } else {
            Alert.alert('Error', 'Gagal Mendapatkan Data Jadwal Matakuliah');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert('Error', 'Gagal Mendapatkan Data Jadwal Matakuliah');
    }
  };

  const confirmationDelete = () => {
    Alert.alert('Caution', 'Reset Jadwal Matakuliah ?', [
      {text: 'CANCEL', onPress: () => {}},
      {text: 'OK', onPress: () => handleReset()},
    ]);
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      await AppService.cleanUpSesi()
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            navigation.replace('Home');
          } else {
            Alert.alert('Error', 'Gagal Reset Jadwal Matakuliah');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert('Error', 'Gagal Reset Jadwal Matakuliah');
    }
  };

  useEffect(() => {
    handleGetData(search);
  }, [search]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Jadwal Matakuliah</Headline>
          <TextInput
            label="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={searchStyle}
            dense
          />
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Matakuliah</DataTable.Title>
            <DataTable.Title style={actionCell}>Dosen</DataTable.Title>
            <DataTable.Title numeric style={actionCell}>
              SKS
            </DataTable.Title>
            <DataTable.Title numeric style={actionCell}>
              Semester
            </DataTable.Title>
            <DataTable.Title style={actionCell}>Jam</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length > 0 ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{val.name_mk}</DataTable.Cell>
                  <DataTable.Cell style={actionCell}>
                    {val.nama_dosen}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={actionCell}>
                    {val.sks}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={actionCell}>
                    {val.semester}
                  </DataTable.Cell>
                  <DataTable.Cell style={actionCell}>{val.jam}</DataTable.Cell>
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
          mode="contained"
          color={Colors.redA700}
          style={addButton}
          disabled={loading}
          onPress={() => confirmationDelete()}>
          Reset Jadwal Matakuliah
        </Button>
      </View>
    </View>
  );
}

export default MatakuliahScreen;