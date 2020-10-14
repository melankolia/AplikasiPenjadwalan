import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  DataTable,
  Headline,
  TextInput,
  Button,
  IconButton,
  Colors,
} from 'react-native-paper';
import style from './index.style.js';

const {container, titleContainerText, searchStyle, actionCell} = style;

function HomeScreen({navigation}) {
  const [value, setValue] = useState([
    {nidn: '12345678', name: 'Dosen 1', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
    {nidn: '12345678', name: 'Dosen 2', telp: '08127803910'},
  ]);

  const [search, setSearch] = useState('');

  return (
    <View style={container}>
      <View style={titleContainerText}>
        <Headline>Pengampu</Headline>
      </View>
      <View>
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
            <DataTable.Title>NIDN</DataTable.Title>
            <DataTable.Title>Nama</DataTable.Title>
            <DataTable.Title>Telp</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.map((val, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{val.nidn}</DataTable.Cell>
                <DataTable.Cell>{val.name}</DataTable.Cell>
                <DataTable.Cell>{val.telp}</DataTable.Cell>
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
                    onPress={() => console.log('Pressed')}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
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
          onPress={() => navigation.navigate('Add Dosen')}>
          Add Pengampu
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
