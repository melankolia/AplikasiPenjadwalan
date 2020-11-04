import React, {useState, useEffect} from 'react';
import {Alert, View, ScrollView} from 'react-native';
import {
  DataTable,
  Headline,
  TextInput,
  Button,
  IconButton,
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

function DosenScreen({navigation}) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleGetData = async () => {
  //   let data = await AsyncStorage.getData('storeDosen');
  //   setValue(data);
  // };

  const handleGetData = async (params) => {
    try {
      let payload = {
        nama_dosen: params,
      };
      setLoading(true);
      await AppService.getDosen(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            setValue(result);
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

  const handleRemove = async (index) => {
    try {
      let payload = {
        nidn_dosen: index,
      };
      await AppService.deleteDosen(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            handleGetData();
          } else {
            Alert.alert('Error', 'Gagal Menghapus Data Dosen');
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('Error', 'Gagal Menghapus Data Dosen');
    }
  };

  useEffect(() => {
    handleGetData(search);
  }, [search]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Dosen</Headline>
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
            <DataTable.Title>NIDN</DataTable.Title>
            <DataTable.Title>Nama</DataTable.Title>
            <DataTable.Title>Telp</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length > 0 ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{val.nidn_dosen}</DataTable.Cell>
                  <DataTable.Cell>{val.nama}</DataTable.Cell>
                  <DataTable.Cell>{val.telpon}</DataTable.Cell>
                  <DataTable.Cell style={actionCell}>
                    <IconButton
                      icon="pencil"
                      color={Colors.blueA700}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                    <IconButton
                      icon="delete"
                      color={Colors.red400}
                      size={20}
                      onPress={() => handleRemove(val.nidn_dosen)}
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
          icon="plus"
          mode="contained"
          color={Colors.blueA700}
          style={addButton}
          onPress={() => navigation.replace('Add Dosen')}>
          Add Dosen
        </Button>
      </View>
    </View>
  );
}

export default DosenScreen;
