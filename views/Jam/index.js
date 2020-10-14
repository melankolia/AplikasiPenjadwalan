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
    {no: '1', time: '08.30 - 09.00'},
    {no: '2', time: '09.00 - 09.30'},
    {no: '3', time: '09.30 - 10.00'},
    {no: '4', time: '10.00 - 11.00'},
  ]);

  const [search, setSearch] = useState('');

  return (
    <View style={container}>
      <View style={titleContainerText}>
        <Headline>Jam</Headline>
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
            <DataTable.Title>No</DataTable.Title>
            <DataTable.Title>Range Jam</DataTable.Title>
            <DataTable.Title style={actionCell}>Action</DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {value.map((val, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{val.no}</DataTable.Cell>
                <DataTable.Cell>{val.time}</DataTable.Cell>
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
          onPress={() => navigation.navigate('Add Jam')}>
          Add Jam
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;
