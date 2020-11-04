import React, {useState, useEffect} from 'react';
import {View, Alert, ScrollView} from 'react-native';
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
      await AppService.getMatkul(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            setValue(result);
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

  const handleRemove = async (index) => {
    try {
      let payload = {
        id_matkul: index,
      };
      await AppService.deleteMatkul(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            handleGetData();
          } else {
            Alert.alert('Error', 'Gagal Menghapus Data Matakuliah');
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('Error', 'Gagal Menghapus Data Matakuliah');
    }
  };
  useEffect(() => {
    handleGetData(search);
  }, [search]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Matakuliah</Headline>
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
            <DataTable.Title>Kode MK</DataTable.Title>
            <DataTable.Title>Nama</DataTable.Title>
            <DataTable.Title numeric>SKS</DataTable.Title>
            <DataTable.Title numeric style={actionCell}>
              Semester
            </DataTable.Title>
            <DataTable.Title>Jenis</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length > 0 ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{val.kode_mk}</DataTable.Cell>
                  <DataTable.Cell>{val.name_mk}</DataTable.Cell>
                  <DataTable.Cell numeric>{val.sks}</DataTable.Cell>
                  <DataTable.Cell numeric style={actionCell}>
                    {val.semester}
                  </DataTable.Cell>
                  <DataTable.Cell>{val.jenis}</DataTable.Cell>
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
                      onPress={() => handleRemove(val.id_matkul)}
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
          onPress={() => navigation.replace('Add Matakuliah')}>
          Add Matakuliah
        </Button>
      </View>
    </View>
  );
}

export default MatakuliahScreen;
