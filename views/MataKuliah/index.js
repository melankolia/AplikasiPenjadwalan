import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {
  DataTable,
  Headline,
  TextInput,
  Button,
  IconButton,
  Colors,
} from 'react-native-paper';
import AsyncStorage from '../../Helper/AsyncStorage';
import style from './index.style.js';

const {container, titleContainerText, searchStyle, actionCell} = style;

function HomeScreen({navigation}) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');

  const handleGetData = async () => {
    let data = await AsyncStorage.getData('storeMatkul');
    setValue(data);
  };

  const handleRemove = (index) => {
    let filtered = value.filter((e, i) => i !== index);
    setValue(filtered);
    AsyncStorage.storeData(filtered, 'storeMatkul');
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <View style={container}>
      <View>
        <View style={titleContainerText}>
          <Headline>Mata Kuliah</Headline>
        </View>
        <TextInput
          mode="outlined"
          label="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={searchStyle}
          dense
        />
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
                  <DataTable.Cell>{val.codeMk}</DataTable.Cell>
                  <DataTable.Cell>{val.name}</DataTable.Cell>
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
                      onPress={() => handleRemove(index)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Row style={actionCell}>
                <DataTable.Cell>No Data Available</DataTable.Cell>
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
      </View>
      <View>
        <Button
          icon="plus"
          mode="contained"
          color={Colors.blueA700}
          onPress={() => navigation.replace('Add Matakuliah')}>
          Add Matakuliah
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
