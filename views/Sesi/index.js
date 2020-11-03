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
  containerBottom,
  tableStyle,
} = style;

function HomeScreen({navigation}) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleGetData = async () => {
  //   let data = await AsyncStorage.getData('storeRuang');
  //   setValue(data);
  // };

  const handleGetData = async (params) => {
    try {
      let payload = {
        nama_ruangan: params,
      };
      setLoading(true);
      await AppService.getSesi(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            setValue(result);
          } else {
            Alert.alert('Error', 'Gagal Mendapatkan Data Sesi');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert('Error', 'Gagal Mendapatkan Data Sesi');
    }
  };

  const handleRemove = (index) => {
    let filtered = value.filter((e, i) => i !== index);
    setValue(filtered);
    AsyncStorage.storeData(filtered, 'storeRuang');
  };

  useEffect(() => {
    handleGetData(search);
  }, [search]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Sesi</Headline>
          <TextInput
            label="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={searchStyle}
            dense
          />
        </View>
        <DataTable style={tableStyle}>
          <DataTable.Header>
            <DataTable.Title>Hari</DataTable.Title>
            <DataTable.Title numeric style={actionCell}>
              Ruangan
            </DataTable.Title>
            <DataTable.Title>Jam</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{val.nama_hari}</DataTable.Cell>
                  <DataTable.Cell numeric style={actionCell}>
                    {val.nama_ruangan}
                  </DataTable.Cell>
                  <DataTable.Cell>{val.range_jam}</DataTable.Cell>
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
    </View>
  );
}

export default HomeScreen;
