import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyle, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [nidn, setNidn] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="NIDN"
          value={nidn}
          style={searchStyleTop}
          onChangeText={(text) => setNidn(text)}
          dense
          placeholder="Input NIDN"
        />
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={searchStyle}
          dense
          placeholder="Input Name"
        />
        <TextInput
          mode="outlined"
          label="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={searchStyle}
          placeholder="Input Address"
          multiline
        />
        <TextInput
          mode="outlined"
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={searchStyle}
          dense
          placeholder="Input Phone"
        />
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          onPress={() => console.log('ADD DOSEN')}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default Add;
