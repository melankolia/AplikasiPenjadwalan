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
  //   let data = await AsyncStorage.getData('storeJam');
  //   setValue(data);
  // };

  const handleGetData = async (params) => {
    try {
      let payload = {
        range_jam: params,
      };
      setLoading(true);
      await AppService.getJam(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            setValue(result);
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

  const handleRemove = async (index) => {
    try {
      let payload = {
        id_jam: index,
      };
      await AppService.deleteJam(payload)
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            handleGetData();
          } else {
            Alert.alert('Error', 'Gagal Menghapus Jam');
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      Alert.alert('Error', 'Gagal Menghapus Jam');
    }
  };

  useEffect(() => {
    handleGetData(search);
  }, [search]);

  return (
    <View style={container}>
      <ScrollView>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Jam</Headline>
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
            <DataTable.Title>Range Jam</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length > 0 ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>{val.range_jam}</DataTable.Cell>
                  <DataTable.Cell style={actionCell}>
                    <IconButton
                      icon="pencil"
                      color={Colors.blueA700}
                      size={20}
                      onPress={() =>
                        navigation.navigate('Add Jam', {id_jam: val.id_jam})
                      }
                    />
                    <IconButton
                      icon="delete"
                      color={Colors.red400}
                      size={20}
                      onPress={() => handleRemove(val.id_jam)}
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
          onPress={() => navigation.navigate('Add Jam')}>
          Add Jam
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
