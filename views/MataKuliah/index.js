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
    {
      codeMk: 'SK421',
      name: 'Interaksi Manusia dan Komputer',
      sks: 3,
      semester: 7,
      jenis: 'Teori',
    },
    {
      codeMk: 'SK123',
      name: 'Kriptografi',
      sks: 3,
      semester: 7,
      jenis: 'Teori',
    },
  ]);

  const [search, setSearch] = useState('');

  return (
    <View style={container}>
      <View style={titleContainerText}>
        <Headline>Mata Kuliah</Headline>
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
            {value.map((val, index) => (
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
          onPress={() => navigation.navigate('Add Matakuliah')}>
          Add Matakuliah
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
