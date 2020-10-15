import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  DataTable,
  Headline,
  TextInput,
  IconButton,
  Colors,
} from 'react-native-paper';
import style from './index.style.js';

const {
  container,
  titleContainerText,
  searchStyle,
  headerStyle,
  actionCell,
} = style;

function HomeScreen({navigation}) {
  const [value, setValue] = useState([
    {hari: 'Senin', jam: '08:00 - 08:30', status: false},
    {hari: 'Selasa', jam: '08:30 - 09:00', status: false},
    {hari: 'Rabu', jam: '09:00 - 09:30', status: false},
    {hari: 'Kamis', jam: '09:30 - 10:00', status: false},
  ]);

  const [check, setCheck] = useState(false);

  const [search, setSearch] = useState('');

  return (
    <View style={container}>
      <View>
        <View style={titleContainerText}>
          <Headline style={headerStyle}>Waktu Tidak Tersedia</Headline>
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
            <DataTable.Title>Hari</DataTable.Title>
            <DataTable.Title>Jam</DataTable.Title>
            <DataTable.Title style={actionCell}>Status</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.length > 0 ? (
              value.map((val, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{val.hari}</DataTable.Cell>
                  <DataTable.Cell>{val.jam}</DataTable.Cell>
                  <DataTable.Cell style={actionCell}>
                    <CheckBox
                      disabled={false}
                      value={check}
                      onValueChange={(newValue) => {
                        setCheck(newValue);
                      }}
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
    </View>
  );
}

export default HomeScreen;
