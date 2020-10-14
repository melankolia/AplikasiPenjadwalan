import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
    {name: 'GB 1', capacity: 40, type: 'TEORI'},
    {name: 'GB 2', capacity: 40, type: 'TEORI'},
    {name: 'GB 3', capacity: 40, type: 'TEORI'},
    {name: 'GB 4', capacity: 40, type: 'TEORI'},
  ]);

  const [search, setSearch] = useState('');

  return (
    <View style={container}>
      <View style={titleContainerText}>
        <Headline>Ruang</Headline>
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
            <DataTable.Title>Nama</DataTable.Title>
            <DataTable.Title numeric style={actionCell}>
              Kapasitas
            </DataTable.Title>
            <DataTable.Title>Jenis</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.map((val, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{val.name}</DataTable.Cell>
                <DataTable.Cell numeric style={actionCell}>
                  {val.capacity}
                </DataTable.Cell>
                <DataTable.Cell>{val.type}</DataTable.Cell>
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
          onPress={() => navigation.navigate('Add Ruang')}>
          Add Ruang
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
