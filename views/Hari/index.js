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

function HomeScreen({navigation}) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleGetData = async () => {
  //   let data = await AsyncStorage.getData('storeHari');
  //   setValue(data);
  // };

  const handleGetData = async (params) => {
    try {
      let payload = {
        name_hari: params,
      };
      setLoading(true);
      await AppService.getHari(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            setValue(result);
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

  const handleRemove = async (index) => {
    try {
      let payload = {
        id_hari: index,
      };
      await AppService.deleteHari(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            handleGetData();
          } else {
            Alert.alert('Error', 'Gagal Menghapus Hari');
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('Error', 'Gagal Menghapus Hari');
    }
  };

  useEffect(() => {
    handleGetData(search);
  }, [search]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Hari</Headline>
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
            <DataTable.Title>No</DataTable.Title>
            <DataTable.Title>Hari</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length > 0 ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>{val.name_hari}</DataTable.Cell>
                  <DataTable.Cell style={actionCell}>
                    <IconButton
                      icon="pencil"
                      color={Colors.blueA700}
                      size={20}
                      onPress={() =>
                        navigation.navigate('Add Hari', {id_hari: val.id_hari})
                      }
                    />
                    <IconButton
                      icon="delete"
                      color={Colors.red400}
                      size={20}
                      onPress={() => handleRemove(val.id_hari)}
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
          onPress={() => navigation.navigate('Add Hari')}>
          Add Hari
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
